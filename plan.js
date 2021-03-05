1. Create /api/shorturl/new POST endpoint
	A. get the body from the request and get the fullUrl
	B. validate fullUrl is really exists + is valid (do after)
	C. check if fullUrl is already exists in our DB 
	(db.checkExists(fullUrl) ->true/false)
	D. If exists -> return the shortUrl to the response
	E. if not exists, create a new shortUrl
	db.createShortUrl(fullUrl) -> shorturl
return the shortUrl to the response
    



2. GET /{shorturl}
	1. check if file exists "{shortUrl}.json" -> if not, redirect to 404.html
	2. if exists -> read file "{shorturl}.json" -> increase counter in shortUrlObject -> save shortUrlObject file -> redirect to the shortUrlObject.originalUrl



3. GET
api/statistic/:shorturl-i
*read {shortUrl.txt} file -> return the shortUrlObject to the response

class Database{
	counter.txt -> in this file we will save the counter
	short urls folders -> contains shorturl files
	full urls folder -> contains fullurl files


	createShortUrl(fullUrl)
1.	number = read the number in the counter.txt
2.	number ++
3.	save number to counter.txt (replace the old number)
4.	create shortUrlObject {date, counter(0), origianalUrl, shortUrl)
5.	write new file "{number}.json" -> shortUrlObject
6.	write new file "{fullUrl}.json" -> shorturl
7.	return number

checkExists(fullUrl)
1.	check if there is a file names "{fullUrl}.json" if exists return true, if not return false
}
