using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using Microsoft.Extensions.Configuration;
using AYCCorporate.Configuration;
using AYCCorporate.Web;

namespace AYCCorporate.EntityFrameworkCore
{
    /* This class is needed to run "dotnet ef ..." commands from command line on development. Not used anywhere else */
    public class AYCCorporateDbContextFactory : IDesignTimeDbContextFactory<AYCCorporateDbContext>
    {
        public AYCCorporateDbContext CreateDbContext(string[] args)
        {
            var builder = new DbContextOptionsBuilder<AYCCorporateDbContext>();
            var configuration = AppConfigurations.Get(WebContentDirectoryFinder.CalculateContentRootFolder());

            AYCCorporateDbContextConfigurer.Configure(builder, configuration.GetConnectionString(AYCCorporateConsts.ConnectionStringName));

            return new AYCCorporateDbContext(builder.Options);
        }
    }
}
