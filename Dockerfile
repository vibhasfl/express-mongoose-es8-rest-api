FROM node:12-alpine
RUN apk --no-cache add --virtual native-deps \
  g++ gcc libgcc libstdc++ linux-headers autoconf automake make nasm python git && \
  npm install --quiet node-gyp -g
WORKDIR /app
COPY package*.json /app/
RUN yarn
COPY ./dist/. /app/
CMD DEBUG=app node index.js
EXPOSE 5000
