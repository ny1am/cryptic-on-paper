FROM node:16-alpine as builder
WORKDIR /code/
ADD yarn.lock .
ADD package.json .
RUN yarn install --frozen-lockfile
ADD . .
RUN yarn build

FROM devforth/spa-to-http:latest
COPY --from=builder /code/dist/ .