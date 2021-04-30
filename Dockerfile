FROM node

WORKDIR /info-globo

COPY package.json .

RUN npm install

RUN npm install nodemon -g --quiet

COPY . . 

EXPOSE 3333

CMD nodemon -L --watch . index.js