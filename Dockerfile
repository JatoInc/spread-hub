FROM mhart/alpine-node:10

ENV PORT 4000
ENV WDIR /process
ENV BASE_API="v1"
ENV DATABASE=""

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