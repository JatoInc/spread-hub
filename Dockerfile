FROM mhart/alpine-node:10

ENV PORT 4000
ENV WDIR /process
ENV BASE_API="v1"
ENV MONGO_PORTAL="mongodb+srv://jatoInc:J470C45U4L@cluster-spread-g7uyz.azure.mongodb.net/test?retryWrites=true&w=majority"
ENV JWT_SECRET="YC@sc835aSF&M3Zx#"

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