using System.Data.Common;
using Microsoft.EntityFrameworkCore;

namespace AYCCorporate.EntityFrameworkCore
{
    public static class AYCCorporateDbContextConfigurer
    {
        public static void Configure(DbContextOptionsBuilder<AYCCorporateDbContext> builder, string connectionString)
        {
            builder.UseNpgsql(connectionString);
        }

        public static void Configure(DbContextOptionsBuilder<AYCCorporateDbContext> builder, DbConnection connection)
        {
            builder.UseNpgsql(connection);
        }
    }
}
