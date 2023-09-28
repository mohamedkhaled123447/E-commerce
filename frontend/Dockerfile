FROM node:16.17.1

WORKDIR /home/exampleapp

COPY package-lock.json ./

COPY package.json ./

RUN npm install --prefer-offline --no-audit

COPY entrypoint.sh /usr/local/bin/

RUN chmod +x /usr/local/bin/entrypoint.sh

COPY ./ ./

ENTRYPOINT [ "/usr/local/bin/entrypoint.sh" ]

EXPOSE 3000
