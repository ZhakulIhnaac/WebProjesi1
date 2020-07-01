FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build-env
ARG ServerRootAddress
ARG ClientRootAddress
 
WORKDIR /app
 
COPY nuget.config /
 
COPY . .
 
#RUN cat  src/AYCCorporate.Web.Host/appsettings.json
 
RUN dotnet restore ./src/AYCCorporate.Web.Host/AYCCorporate.Web.Host.csproj
 
COPY . .
 
 
RUN dotnet publish ./src/AYCCorporate.Web.Host/AYCCorporate.Web.Host.csproj -c Release -o out
 
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1
WORKDIR /app
COPY --from=build-env /app/out ./
EXPOSE 21021
EXPOSE 80
ENTRYPOINT ["dotnet", "AYCCorporate.Web.Host.dll"]
