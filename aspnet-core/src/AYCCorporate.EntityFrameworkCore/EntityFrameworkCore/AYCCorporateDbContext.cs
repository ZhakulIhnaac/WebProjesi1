using Microsoft.EntityFrameworkCore;
using Abp.Zero.EntityFrameworkCore;
using AYCCorporate.Authorization.Roles;
using AYCCorporate.Authorization.Users;
using AYCCorporate.MultiTenancy;
using Abp.Localization;
using Domain.Entity;
using AYCCorporate.CustomEntity;

namespace AYCCorporate.EntityFrameworkCore
{
    public class AYCCorporateDbContext : AbpZeroDbContext<Tenant, Role, User, AYCCorporateDbContext>
    {
        /* Define a DbSet for each entity of the application */

        #region corporateDbSets
        public virtual DbSet<Firms> Firms { get; set; }
        public virtual DbSet<Contacts> Contacts { get; set; }
        public virtual DbSet<Tenders> Tenders { get; set; }
        public virtual DbSet<Consortiums> Consortiums { get; set; }
        public virtual DbSet<ContactChannel> ContactChannel { get; set; }
        public virtual DbSet<ContactNotes> ContactNotes { get; set; }
        public virtual DbSet<ContactAreas> ContactAreas { get; set; }
        public virtual DbSet<ContactExperiences> ContactExperiences { get; set; }
        public virtual DbSet<ContactFirm> ContactFirm { get; set; }
        public virtual DbSet<FirmAreas> FirmAreas { get; set; }
        public virtual DbSet<TenderAreas> TenderAreas { get; set; }
        public virtual DbSet<FirmConsortium> FirmConsortium { get; set; }
        public virtual DbSet<EmailNotifications> EmailNotifications { get; set; }
        public virtual DbSet<EmailNotificationReceivers> EmailNotificationReceivers { get; set; }
        public virtual DbSet<ScoreStatisticsOfFirmAsLeader> ScoreStatisticsOfFirmAsLeader { get; set; }
        public virtual DbSet<ScoreStatisticsOfFirmAsMember> ScoreStatisticsOfFirmAsMember { get; set; }
        public virtual DbSet<ScoreStatisticsOfFirmTotal> ScoreStatisticsOfFirmTotal { get; set; }
        public virtual DbSet<ShortlistResultsOfFirm> ShortlistResultsOfFirm { get; set; }
        public virtual DbSet<FirmConsortiumTender> FirmConsortiumTender { get; set; }

        #endregion

        #region definitionDbSets
        public virtual DbSet<ChannelType> ChannelType { get; set; }
        public virtual DbSet<ContractingAuthorities> ContractingAuthorities { get; set; }
        public virtual DbSet<Countries> Countries { get; set; }
        public virtual DbSet<Currency> Currency { get; set; }
        public virtual DbSet<Funder> Funder { get; set; }
        public virtual DbSet<Status> Status { get; set; }
        public virtual DbSet<TenderType> TenderType { get; set; }
        public virtual DbSet<WorkingAreas> WorkingAreas { get; set; }

        #endregion

        public AYCCorporateDbContext(DbContextOptions<AYCCorporateDbContext> options)
            : base(options)
        {
        }

        // add these lines to override max length of property
        // we should set max length smaller than the PostgreSQL allowed size (10485760)
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<ApplicationLanguageText>()
                .Property(p => p.Value)
                .HasMaxLength(100); // any integer that is smaller than 10485760
        }
    }
}
