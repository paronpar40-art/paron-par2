FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy project files
COPY src/API/ArmoredManagement.API.csproj src/API/
COPY src/Application/ArmoredManagement.Application.csproj src/Application/
COPY src/Domain/ArmoredManagement.Domain.csproj src/Domain/
COPY src/Infrastructure/ArmoredManagement.Infrastructure.csproj src/Infrastructure/

RUN dotnet restore src/API/ArmoredManagement.API.csproj

# Copy rest of backend code
COPY . .
WORKDIR /src/src/API
RUN dotnet build ArmoredManagement.API.csproj -c Release -o /app/build

FROM build AS publish
RUN dotnet publish ArmoredManagement.API.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 80
EXPOSE 443
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ArmoredManagement.API.dll"]
