
from newspaper import Article
import mysql.connector as mariadb
from newspaper.article import ArticleException, ArticleDownloadState
# import articleDateExtractor
import sys
from time import sleep
import concurrent.futures
import json
from newspaper import Config, Article, Source
from bs4 import BeautifulSoup
# config = Config()
# config.MAX_SUMMARY = 1000
import re

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

            # for description
            # article.nlp()
            # print(article.summary[:400])
            soup = BeautifulSoup(article.html, "lxml")
            domainDesc = article.text[:270]
            
            desc1 = soup.find(attrs={"property": re.compile(r"description", re.I)})
            if desc1 is not None:
                desc1 = desc1['content']
                if(len(desc1)>25):
                    domainDesc = desc1
            desc2 = soup.find(attrs={"name": re.compile(r"description", re.I)})
            if desc2 is not None:
                desc2 = desc2['content']
                if(len(desc2)>25):
                    domainDesc = desc2

            img = article.top_image
            
            outLinks = len(soup.find_all('a', href=True))

            mariadb_connectionT = mariadb.connect(
                host=dbData["host"], user='root', password=dbData["password"], database='avSearch')

            cursor = mariadb_connectionT.cursor()

            if img:
                cursor.execute("UPDATE `{!s}` set imgLink = {!a} , imgCount = '{:d}', charCount='{:d}', outLinksCount='{:d}', domainTitle={!a} , domainDesc={!a}  where ipfsHash='{!s}'".format(
                    domain, img, len(article.imgs), len(article.text), outLinks,  article.title, domainDesc, ipfsHash))
            else:
                cursor.execute("UPDATE `{!s}` set charCount='{:d}',outLinksCount='{:d}', domainTitle={!a} , domainDesc={!a} where ipfsHash='{!s}'".format(
                    domain, len(article.text), outLinks,  article.title, domainDesc, ipfsHash))
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
            print("Article exception", url)
            return
    finally:
        if cursor:
            cursor.close()
        mariadb_connectionT.close()


domain = "avDomains"

with open('details.json') as f:
    dbData = json.load(f)

with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
    try:
        # Start the load operations and mark each future with its URL
        mariadb_connection = mariadb.connect(
            host=dbData["host"], user='root', password=dbData["password"], database='avSearch')
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
