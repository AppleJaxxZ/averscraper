THIS IS FOR M1
docker build \
 -f ./Dockerfile \
 -t averscraper \
 --build-arg NODE_ENV=production \
 ./

FOR UPLOADING IT TO ECR

docker build \
 -f ./Dockerfile \
 -t averscraperamd \
 --build-arg NODE_ENV=production \
 ./ --platform linux/amd64
