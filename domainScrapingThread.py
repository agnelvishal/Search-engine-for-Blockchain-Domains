
from newspaper import Article
import mysql.connector as mariadb
from newspaper.article import ArticleException, ArticleDownloadState
import articleDateExtractor
import sys
from time import sleep
import concurrent.futures
import json
from newspaper import Config, Article, Source
# config = Config()
# config.MAX_SUMMARY = 1000


def article(text):
    try:
        try:
            ipfsHash = text[0]
            
            url = "https://gateway.ipfs.io/ipfs/" + ipfsHash
          #  print(url)
            article = Article(url)
            article.download()
            slept = 0
            while article.download_state == ArticleDownloadState.NOT_STARTED:
                # Raise exception if article download state does not change after 10 seconds
                if slept > 20:
                    raise ArticleException('Download never started')
                sleep(1)
                slept += 1
            article.parse()
            article.nlp()
            print(article.summary[:400])
            mariadb_connectionT = mariadb.connect(
                host='127.0.0.1', user='root', password='', database='avSearch')
            cursor = mariadb_connectionT.cursor()

            img = article.top_image

            if img:
                # cursor.execute("UPDATE `{!s}` set image = {!a} , charCount='{:d}',wordCount='{:d}',entropy='{:d}',stopWords='{:d}',titleCount='{:d}', imgCount = '{:d}', title={!a},  where url='{!s}'".format(
                #     domain, img, len(article.text), article.totalWords, article.entropyN, article.stopWords, len(article.title), len(article.imgs), article.title, url))
                cursor.execute("UPDATE `{!s}` set imgLink = {!a} , imgCount = '{:d}', charCount='{:d}', domainTitle={!a}  where ipfsHash='{!s}'".format(
                    domain, img, len(article.text), len(article.imgs), article.title, ipfsHash))
            else:
                cursor.execute("UPDATE `{!s}` set charCount='{:d}', domainTitle={!a} where ipfsHash='{!s}'".format(
                    domain, len(article.text),  article.title, ipfsHash))
            mariadb_connectionT.commit()
        except mariadb.Error as err:
            print("db error", err)
        except ValueError as err:
            print("Value Error", url)
            print(err)
        except TypeError as err:
            print("Type Error", url)
            print(err)
        except ArticleException:
            #print("Article exception", url)
            return
    finally:
        if cursor:
            cursor.close()
        mariadb_connectionT.close()


domain = "avDomains"

with open('details.json') as f:
    data = json.load(f)

print(data["password"])
with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    try:
        # Start the load operations and mark each future with its URL
        mariadb_connection = mariadb.connect(
            host=data["host"], user='root', password=data["password"], database='avSearch')
        cursor = mariadb_connection.cursor()
        cursor.execute(
            "SELECT ipfsHash FROM `{!s}` where ipfsHash is not null".format(domain))
        data = cursor.fetchall()
        future_to_url = {executor.submit(article, text): text for text in data}
        concurrent.futures.wait(future_to_url)
    finally:
        print("end")
        mariadb_connection.close()

#             "SELECT ipfsHash FROM `{!s}` where charCount is null and ipfsHash is not null".format(domain))
