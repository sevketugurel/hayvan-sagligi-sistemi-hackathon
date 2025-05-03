FROM maven:3.8.5-openjdk-17
WORKDIR /app
COPY pom.xml .
COPY src ./src

EXPOSE 8080 5005

CMD ["mvn", "spring-boot:run", "-Dspring-boot.run.jvmArguments='-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005'"] 