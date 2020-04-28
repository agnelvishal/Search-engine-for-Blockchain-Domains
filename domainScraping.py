
from newspaper import Article
import mysql.connector as mariadb
from newspaper.article import ArticleException, ArticleDownloadState
import articleDateExtractor
import sys
from time import sleep

mariadb_connection = mariadb.connect(
    host='127.0.0.1', user='root', password='', database='avSearch')
cursor = mariadb_connection.cursor()

domain = "avDomains"
cursor.execute(
    "SELECT ipfsHash FROM `{!s}` where ipfsHash is not null limit 10000 offset 1".format(domain))
data = cursor.fetchall()
try:
    for text in data:
        try:
            url = text[0]
            url =  "https://gateway.ipfs.io/ipfs/"+ url
            print(url)
            article = Article(url)
            article.download()
            slept = 0
            while article.download_state == ArticleDownloadState.NOT_STARTED:
                # Raise exception if article download state does not change after 10 seconds
                if slept > 9:
                    raise ArticleException('Download never started')
                sleep(1)
                slept += 1
            article.parse()

            img = article.top_image

            if img:
                # cursor.execute("UPDATE `{!s}` set image = {!a} , charCount='{:d}',wordCount='{:d}',entropy='{:d}',stopWords='{:d}',titleCount='{:d}', imgCount = '{:d}', title={!a},  where url='{!s}'".format(
                #     domain, img, len(article.text), article.totalWords, article.entropyN, article.stopWords, len(article.title), len(article.imgs), article.title, url))
                cursor.execute("UPDATE `{!s}` set imageLink = {!a} , imgCount = '{:d}', charCount='{:d}', title={!a}  where url='{!s}'".format(
                    domain, img, len(article.text), len(article.imgs), article.title, url))                
            else:
                cursor.execute("UPDATE `{!s}` set charCount='{:d}', title={!a} where url='{!s}'".format(
                    domain, len(article.text),  article.title, url))
            mariadb_connection.commit()
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
            continue
finally:
    if cursor:
        cursor.close()
    mariadb_connection.close()
