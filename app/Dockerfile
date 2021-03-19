FROM public.ecr.aws/lambda/nodejs:14 as build

WORKDIR /app
COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build


FROM public.ecr.aws/lambda/nodejs:14 as prod
COPY --from=build /app/build ./build
COPY package*.json ./
RUN npm install --only=production
# Command can be overwritten by providing a different command in the template directly.
CMD ["build/app.handler"]
