#
# Build
#
FROM maven:3.8.3-openjdk-17-slim AS build

COPY src /home/app/src

COPY pom.xml /home/app

RUN mvn -f /home/app/pom.xml clean package

#
# Package stage
#
FROM eclipse-temurin:17-jdk-focal

COPY --from=build /home/app/target/app-0.0.1-SNAPSHOT.jar /usr/local/lib/app-0.0.1-SNAPSHOT.jar

ENTRYPOINT ["java","-jar","/usr/local/lib/app-0.0.1-SNAPSHOT.jar"]

#
#
#WORKDIR /app
#
#COPY .mvn/ ./mvn
#COPY mvnw pom.xml ./
#
#RUN ./mvnw dependency:go-offline
#
#COPY src ./src
#
#CMD ["./mvnw", "spring-boot:run"]
#

#
#
#
#FROM openjdk:17-jdk-slim-buster
#WORKDIR /app
#
#COPY app/build/lib/* build/lib/
#
#COPY app/target/app.jar build/
#
#WORKDIR /app/build
#EXPOSE 8080
#ENTRYPOINT java -jar app.jar