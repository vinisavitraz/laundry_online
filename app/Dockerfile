FROM openjdk:17-jdk-slim-buster
WORKDIR /app

COPY app/build/lib/* build/lib/

COPY app/build/libs/app.jar build/

WORKDIR /app/build
EXPOSE 8080
ENTRYPOINT java -jar app.jar