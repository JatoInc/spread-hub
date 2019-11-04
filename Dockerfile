FROM mhart/alpine-node:10.9

ENV PORT 4000
ENV WDIR /process
ENV BASE_API="v1"
ENV MONGO_PORTAL="mongodb+srv://jatoInc:J470C45U4L@cluster-spread-g7uyz.azure.mongodb.net/test?retryWrites=true&w=majority"
ENV JWT_SECRET="YC@sc835aSF&M3Zx#"
ENV AZURE_STORAGE_CONNECTION_STRING="DefaultEndpointsProtocol=https;AccountName=resourcegroupdiag675;AccountKey=1TMGf8c9bIPBtHRUzuMYY4fXf1a8CoQqB4yaYuWSUqTDkCi/Dgzhpt7wiOHmP4F25aaIYpNfeIbigo8MJPTBNA==;EndpointSuffix=core.windows.net"
ENV BLOBS_CONTAINER="jatofiles"
ENV PRODUCTION="true"

RUN apk update && apk upgrade && apk add --no-cache bash git openssh

RUN mkdir -p ${WDIR}
WORKDIR ${WDIR}

COPY . .

RUN apk add --no-cache --virtual .build-deps alpine-sdk python \
    && npm install --production --silent \
    && apk del .build-deps

RUN find ${WDIR} -type f -follow -print | grep -v ./node_modules

EXPOSE ${PORT}

CMD [ "npm", "start" ]