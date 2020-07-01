using Abp.Application.Services;
using Abp.Domain.Repositories;
using AYCCorporate.CustomClasses;
using AYCCorporate.CustomConstants;
using AYCCorporate.CustomConstructs.DatabaseEnums;
using AYCCorporate.CustomConstructs.ListResult;
using AYCCorporate.CustomDto;
using AYCCorporate.CustomEntity;
using Domain.Dto;
using Domain.Entity;
using ICorporateAppServices;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;
using System.Net;
using System.Net.Mail;
using DefinitionAppServices;

namespace CorporateAppServices
{
    public class CorporateAppService : ApplicationService, ICorporateAppService
    {
        private readonly IRepository<Firms, Guid> _firmsRepository;
        private readonly IRepository<Contacts, Guid> _contactsRepository;
        private readonly IRepository<Tenders, Guid> _tendersRepository;
        private readonly IRepository<Consortiums, Guid> _consortiumsRepository;
        private readonly IRepository<ContactChannel, Guid> _contactChannelRepository;
        private readonly IRepository<ContactNotes, Guid> _contactNotesRepository;
        private readonly IRepository<ContactAreas, Guid> _contactAreasRepository;
        private readonly IRepository<ContactExperiences, Guid> _contactExperiencesRepository;
        private readonly IRepository<FirmConsortium, Guid> _firmConsortiumRepository;
        private readonly IRepository<ContactFirm, Guid> _contactFirmRepository;
        private readonly IRepository<FirmAreas, Guid> _firmAreasRepository;
        private readonly IRepository<TenderAreas, Guid> _tenderAreasRepository;
        private readonly IRepository<ScoreStatisticsOfFirmAsLeader, Guid> _scoreStatisticsOfFirmAsLeaderRepository;
        private readonly IRepository<ScoreStatisticsOfFirmAsMember, Guid> _scoreStatisticsOfFirmAsMemberRepository;
        private readonly IRepository<ScoreStatisticsOfFirmTotal, Guid> _scoreStatisticsOfFirmTotalRepository;
        private readonly IRepository<ShortlistResultsOfFirm, Guid> _shortlistResultsOfFirmRepository;
        private readonly IRepository<FirmConsortiumTender, Guid> _firmConsortiumTenderRepository;
        private readonly IRepository<EmailNotificationReceivers, Guid> _emailNotificationReceiversRepository;
        private readonly IRepository<EmailNotifications, Guid> _emailNotificationsRepository;

        public CorporateAppService(
            IRepository<Firms, Guid> firmsRepository,
            IRepository<Contacts, Guid> contactsRepository,
            IRepository<Tenders, Guid> tendersRepository,
            IRepository<Consortiums, Guid> consortiumsRepository,
            IRepository<ContactChannel, Guid> contactChannelRepository,
            IRepository<ContactNotes, Guid> contactNotesRepository,
            IRepository<ContactAreas, Guid> contactAreasRepository,
            IRepository<ContactExperiences, Guid> contactExperiencesRepository,
            IRepository<FirmConsortium, Guid> firmConsortiumRepository,
            IRepository<ContactFirm, Guid> contactFirmRepository,
            IRepository<FirmAreas, Guid> firmAreasRepository,
            IRepository<TenderAreas, Guid> tenderAreasRepository,
            IRepository<ScoreStatisticsOfFirmAsLeader, Guid> scoreStatisticsOfFirmAsLeaderRepository,
            IRepository<ScoreStatisticsOfFirmAsMember, Guid> scoreStatisticsOfFirmAsMemberRepository,
            IRepository<ScoreStatisticsOfFirmTotal, Guid> scoreStatisticsOfFirmTotalRepository,
            IRepository<ShortlistResultsOfFirm, Guid> shortlistResultsOfFirmRepository,
            IRepository<FirmConsortiumTender, Guid> firmConsortiumTenderRepository,
            IRepository<EmailNotificationReceivers, Guid> emailNotificationReceiversRepository,
            IRepository<EmailNotifications, Guid> emailNotificationsRepository
            )
        {
            _firmsRepository = firmsRepository;
            _contactsRepository = contactsRepository;
            _tendersRepository = tendersRepository;
            _consortiumsRepository = consortiumsRepository;
            _contactChannelRepository = contactChannelRepository;
            _contactNotesRepository = contactNotesRepository;
            _contactAreasRepository = contactAreasRepository;
            _contactExperiencesRepository = contactExperiencesRepository;
            _firmConsortiumRepository = firmConsortiumRepository;
            _contactFirmRepository = contactFirmRepository;
            _firmAreasRepository = firmAreasRepository;
            _tenderAreasRepository = tenderAreasRepository;
            _scoreStatisticsOfFirmAsLeaderRepository = scoreStatisticsOfFirmAsLeaderRepository;
            _scoreStatisticsOfFirmAsMemberRepository = scoreStatisticsOfFirmAsMemberRepository;
            _scoreStatisticsOfFirmTotalRepository = scoreStatisticsOfFirmTotalRepository;
            _shortlistResultsOfFirmRepository = shortlistResultsOfFirmRepository;
            _firmConsortiumTenderRepository = firmConsortiumTenderRepository;
            _emailNotificationReceiversRepository = emailNotificationReceiversRepository;
            _emailNotificationsRepository = emailNotificationsRepository;
        }

        #region Firms

        [HttpPost]
        public async Task<ListResultDto<FirmsDto>> GetFirmForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var res = _firmsRepository.GetAllIncluding(x => x.Country).Where(LinqBuilder.WhereStatementBuilder(searchParamList)).OrderBy(x => x.Name);
            var firmsList = res.Skip((page - 1) * maxResult).Take(maxResult);
            var totalItems = res.Count();

            ListResultDto<FirmsDto> result = new ListResultDto<FirmsDto>();
            result.totalItemCount = totalItems;
            result.itemList = ObjectMapper.Map<List<FirmsDto>>(firmsList);
            return result;
        }

        [HttpPost]
        public async Task<List<FirmsDto>> GetFirmForSelectBox()
        {
            var firmList = _firmsRepository.GetAllIncluding(x => x.Country);
            firmList.OrderBy(x => x.Name);
            return ObjectMapper.Map<List<FirmsDto>>(firmList);
        }

        [HttpGet]
        public async Task<FirmsDto> FindFirm(Guid firmId)
        {
            var firm = _firmsRepository.GetAllIncluding(x => x.Country).Where(x => x.Id == firmId).FirstOrDefault();
            return ObjectMapper.Map<FirmsDto>(firm);
        }

        [HttpPost]
        public async Task<bool> AddFirm(FirmsDto firm)
        {
            var existingFirm = _firmsRepository.FirstOrDefault(x => x.Name == firm.Name && x.CountryId == firm.CountryId);
            if (existingFirm == null)
            {
                await _firmsRepository.InsertAndGetIdAsync(ObjectMapper.Map<Firms>(firm));
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        public async void UpdateFirm(FirmsDto firm)
        {
            await _firmsRepository.UpdateAsync(ObjectMapper.Map<Firms>(firm));
        }

        [HttpGet]
        public async void DeleteFirm(Guid firmId)
        {
            await _firmsRepository.DeleteAsync(firmId);
        }
        #endregion

        #region Contacts

        [HttpPost]
        public async Task<ListResultDto<ContactsDto>> GetContactForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var res = _contactsRepository.GetAllIncluding(x => x.Nationality).Where(LinqBuilder.WhereStatementBuilder(searchParamList));
            var contactList = res.Skip((page - 1) * maxResult).Take(maxResult).OrderBy(x => x.Name);
            var totalItems = res.Count();

            ListResultDto<ContactsDto> result = new ListResultDto<ContactsDto>();
            result.totalItemCount = totalItems;
            result.itemList = ObjectMapper.Map<List<ContactsDto>>(contactList);
            return result;
        }

        [HttpPost]
        public async Task<List<ContactsDto>> GetContactForSelectBox()
        {
            var contactList = await _contactsRepository.GetAllListAsync();
            contactList.OrderBy(x => x.Name);
            return ObjectMapper.Map<List<ContactsDto>>(contactList);
        }

        [HttpGet]
        public async Task<ContactsDto> FindContact(Guid contactId)
        {
            var contact = _contactsRepository.GetAllIncluding(x => x.Nationality).Where(x => x.Id == contactId).FirstOrDefault();
            return ObjectMapper.Map<ContactsDto>(contact);
        }

        [HttpPost]
        public async void AddContact(ContactsDto contact)
        {
            await _contactsRepository.InsertAndGetIdAsync(ObjectMapper.Map<Contacts>(contact));
        }

        [HttpPost]
        public async void UpdateContact(ContactsDto contact)
        {
            await _contactsRepository.UpdateAsync(ObjectMapper.Map<Contacts>(contact));
        }

        [HttpGet]
        public async void DeleteContact(Guid contactId)
        {
            await _contactsRepository.DeleteAsync(contactId);
        }

        #endregion

        #region Tenders

        [HttpPost]
        public async Task<ListResultDto<TendersDto>> GetTenderForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var aa = LinqBuilder.WhereStatementBuilder(searchParamList);
            var res = _tendersRepository.GetAllIncluding(x => x.Status, x => x.Type, x => x.Location).Where(aa).OrderBy(x => x.Title);
            var tenderList = res.Skip((page - 1) * maxResult).Take(maxResult);
            var totalItems = res.Count();

            ListResultDto<TendersDto> result = new ListResultDto<TendersDto>();
            result.totalItemCount = totalItems;
            result.itemList = ObjectMapper.Map<List<TendersDto>>(tenderList);
            return result;
        }

        [HttpPost]
        public async Task<List<TendersDto>> GetTenderForSelectBox()
        {
            var tenderList = await _tendersRepository.GetAllListAsync();
            tenderList.OrderBy(x => x.Title);
            return ObjectMapper.Map<List<TendersDto>>(tenderList);
        }

        [HttpGet]
        public async Task<TendersDto> FindTender(Guid tenderId)
        {
            var tender = _tendersRepository.GetAllIncluding(x => x.Location, x => x.Currency).Where(x => x.Id == tenderId).FirstOrDefault();
            return ObjectMapper.Map<TendersDto>(tender);
        }

        [HttpPost]
        public async Task<bool> AddTender(TendersDto tender)
        {
            tender.ForecastDate = TimeZoneInfo.ConvertTimeFromUtc(tender.ForecastDate, TimeZoneInfo.Local);
            var existingTender = _tendersRepository.FirstOrDefault(x => x.TenderNumber == tender.TenderNumber);
            if (existingTender == null)
            {
                await _tendersRepository.InsertAndGetIdAsync(ObjectMapper.Map<Tenders>(tender));
                Guid emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderAdded)).Id;
                List<string> emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
                var mailBody = "<p>" + tender.Title + "</p>";

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderAdded, mailBody);
                }
                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        public async void UpdateTender(TendersDto tender)
        {
            Guid emailNotificationId;
            List<string> emailAddresses;

            Tenders oldTender = _tendersRepository.FirstOrDefaultAsync(x => x.Id == tender.Id).Result;

            if (oldTender.AwardedConsortiumId != null && oldTender.AwardedConsortiumId != tender.AwardedConsortiumId)
            {
                List<Guid> oldFirmIdList = _firmConsortiumRepository.GetAll().Where(x => x.ConsortiumId == oldTender.AwardedConsortiumId).Select(x => x.FirmId).ToList();
                _firmAreasRepository.GetAll().Where(x => oldFirmIdList.Contains(x.FirmId) && x.TenderId == tender.Id).ToList().ForEach(x => _firmAreasRepository.DeleteAsync(x.Id));
            }

            if (tender.AwardedConsortiumId != null && oldTender.AwardedConsortiumId != tender.AwardedConsortiumId)
            {
                List<long> tenderAreaIdList = _tenderAreasRepository.GetAll().Where(x => x.TenderId == tender.Id).Select(x => x.AreaId).ToList();
                List<Guid> firmIdList = _firmConsortiumRepository.GetAll().Where(x => x.ConsortiumId == tender.AwardedConsortiumId).Select(x => x.FirmId).ToList();

                foreach (var firmId in firmIdList)
                {
                    List<long> firmAreaList = _firmAreasRepository.GetAll().Where(x => x.FirmId == firmId).Select(x => x.AreaId).ToList();

                    foreach (var tenderAreaId in tenderAreaIdList)
                    {
                        bool areaAlreadyExistsForFirm = firmAreaList.Any(item => item == tenderAreaId);
                        if (!areaAlreadyExistsForFirm)
                        {
                            FirmAreas firmArea = new FirmAreas
                            {
                                FirmId = firmId,
                                AreaId = tenderAreaId,
                                TenderId = tender.Id
                            };
                            await _firmAreasRepository.InsertAndGetIdAsync(firmArea);
                        }
                    }
                }
            }

            if (oldTender.StatusId == (long)EStatus.Forecast && tender.StatusId == (long)EStatus.Open)
            {
                emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderOpened)).Id;
                emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
                var mailBody = "<p>" + tender.Title + "(" + tender.Location.CountryName + "</p>";

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderOpened, mailBody);
                }
            }
            else if (oldTender.StatusId == (long)EStatus.Open && tender.StatusId == (long)EStatus.Closed)
            {
                emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderClosed)).Id;
                emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
                var mailBody = "<p>" + tender.Title + "(" + tender.Location.CountryName + "</p>";

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderClosed, mailBody);
                }
            }
            else if (oldTender.StatusId == (long)EStatus.Closed && tender.StatusId == (long)EStatus.Shortlisted)
            {
                emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderShortlisted)).Id;
                emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
                var mailBody = "<p>" + tender.Title + "(" + tender.Location.CountryName + "</p>";

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderShortlisted, mailBody);
                }
            }
            else if (oldTender.StatusId == (long)EStatus.Shortlisted && tender.StatusId == (long)EStatus.Awarded)
            {
                emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderAwarded)).Id;
                emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
                var mailBody = "<p>" + tender.Title + "(" + tender.Location.CountryName + "</p>";

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderAwarded, mailBody);
                }
            }

            tender.ForecastDate = TimeZoneInfo.ConvertTimeFromUtc(tender.ForecastDate, TimeZoneInfo.Local);
            tender.OpeningDate = (tender.OpeningDate != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.OpeningDate, TimeZoneInfo.Local) : null;
            tender.ClosingDate = (tender.ClosingDate != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.ClosingDate, TimeZoneInfo.Local) : null;
            tender.ShortlistDate = (tender.ShortlistDate != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.ShortlistDate, TimeZoneInfo.Local) : null;
            tender.Deadline = (tender.Deadline != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.Deadline, TimeZoneInfo.Local) : null;
            tender.AwardingDate = (tender.AwardingDate != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.AwardingDate, TimeZoneInfo.Local) : null;
            tender.CancellationDate = (tender.CancellationDate != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.CancellationDate, TimeZoneInfo.Local) : null;
            tender.ShortlistDeadlineDate = (tender.ShortlistDeadlineDate != null) ? (DateTime?)TimeZoneInfo.ConvertTimeFromUtc((DateTime)tender.ShortlistDeadlineDate, TimeZoneInfo.Local) : null;

            oldTender.Title = tender.Title;
            oldTender.TypeId = tender.TypeId;
            oldTender.ContractingAuthorityId = tender.ContractingAuthorityId;
            oldTender.LocationId = tender.LocationId;
            oldTender.MaximumBudget = tender.MaximumBudget;
            oldTender.CurrencyId = tender.CurrencyId;
            oldTender.Deadline = tender.Deadline;
            oldTender.ForecastDate = tender.ForecastDate;
            oldTender.OpeningDate = tender.OpeningDate;
            oldTender.ClosingDate = tender.ClosingDate;
            oldTender.ShortlistDate = tender.ShortlistDate;
            oldTender.AwardingDate = tender.AwardingDate;
            oldTender.CancellationDate = tender.CancellationDate;
            oldTender.StatusId = tender.StatusId;
            oldTender.AwardedConsortiumId = tender.AwardedConsortiumId;
            oldTender.AwardedPrice = tender.AwardedPrice;
            oldTender.AwardedTechnicalScore = tender.AwardedTechnicalScore;
            oldTender.AwardedFinancialScore = tender.AwardedFinancialScore;
            oldTender.AwardedTotalScore = tender.AwardedTotalScore;
            oldTender.Duration = tender.Duration;
            oldTender.Description = tender.Description;
            oldTender.Criterias = tender.Criterias;
            oldTender.TenderNumber = tender.TenderNumber;
            oldTender.ShortlistDeadlineDate = tender.ShortlistDeadlineDate;

            await _tendersRepository.UpdateAsync(ObjectMapper.Map<Tenders>(oldTender));

        }

        [HttpGet]
        public async void DeleteTender(Guid tenderId)
        {
            await _tendersRepository.DeleteAsync(tenderId);
        }
        #endregion

        #region EmailNotifications

        [HttpPost]
        public async Task<ListResultDto<EmailNotificationsDto>> GetEmailNotificationsForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var res = _emailNotificationsRepository.GetAll().Where(LinqBuilder.WhereStatementBuilder(searchParamList)).OrderBy(x => x.Name);
            var emailNotificationsList = res.Skip((page - 1) * maxResult).Take(maxResult);
            var totalItems = res.Count();

            ListResultDto<EmailNotificationsDto> result = new ListResultDto<EmailNotificationsDto>();
            result.totalItemCount = totalItems;
            result.itemList = ObjectMapper.Map<List<EmailNotificationsDto>>(emailNotificationsList);
            return result;
        }

        [HttpPost]
        public async Task<List<EmailNotificationsDto>> GetEmailNotificationsForSelectBox()
        {
            var emailNotificationsList = _emailNotificationsRepository.GetAll();
            emailNotificationsList.OrderBy(x => x.Name);
            return ObjectMapper.Map<List<EmailNotificationsDto>>(emailNotificationsList);
        }

        [HttpGet]
        public async Task<EmailNotificationsWithSubscribersDto> FindEmailNotification(Guid emailNotificationId)
        {
            var emailNotificationsWithSubscribers = new EmailNotificationsWithSubscribersDto
            {
                EmailNotification = ObjectMapper.Map<EmailNotificationsDto>(await _emailNotificationsRepository.FirstOrDefaultAsync(x => x.Id == emailNotificationId)),
                UserList = _emailNotificationReceiversRepository.GetAll().Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.UserId).ToList()
            };

            return emailNotificationsWithSubscribers;
        }

        [HttpPost]
        public async Task<bool> AddEmailNotification(EmailNotificationsWithSubscribersDto emailNotificationWithSubscribers)
        {
            var existingFirm = _emailNotificationsRepository.FirstOrDefault(x => x.Name == emailNotificationWithSubscribers.EmailNotification.Name);
            if (existingFirm == null)
            {
                Guid newEmailNotificationId = await _emailNotificationsRepository.InsertAndGetIdAsync(ObjectMapper.Map<EmailNotifications>(emailNotificationWithSubscribers.EmailNotification));
                foreach (var newSubscriber in emailNotificationWithSubscribers.UserList)
                {
                    var newEmailSubscriber = new EmailNotificationReceivers
                    {
                        UserId = newSubscriber,
                        EMailNotificationId = newEmailNotificationId
                    };

                    await _emailNotificationReceiversRepository.InsertAndGetIdAsync(newEmailSubscriber);
                }

                return true;
            }
            else
            {
                return false;
            }
        }

        [HttpPost]
        public async void UpdateEmailNotification(EmailNotificationsWithSubscribersDto emailNotificationWithSubscribers)
        {
            List<EmailNotificationReceivers> existingSubscriberList = _emailNotificationReceiversRepository.GetAll().Where(x => x.EMailNotificationId == emailNotificationWithSubscribers.EmailNotification.Id).ToList();

            foreach (var existingSubscriber in existingSubscriberList)
            {
                bool subscriberExistInNew = emailNotificationWithSubscribers.UserList.Any(item => item == existingSubscriber.UserId);
                if (!subscriberExistInNew)
                {
                    await _emailNotificationReceiversRepository.DeleteAsync(existingSubscriber);
                }
                else
                {
                    emailNotificationWithSubscribers.UserList.Remove(existingSubscriber.UserId);
                }
            }

            foreach (var newSubscriber in emailNotificationWithSubscribers.UserList)
            {
                var newEmailSubscriber = new EmailNotificationReceivers
                {
                    UserId = newSubscriber,
                    EMailNotificationId = emailNotificationWithSubscribers.EmailNotification.Id
                };

                await _emailNotificationReceiversRepository.InsertAndGetIdAsync(newEmailSubscriber);
            }

            await _emailNotificationsRepository.UpdateAsync(ObjectMapper.Map<EmailNotifications>(emailNotificationWithSubscribers.EmailNotification));
        }

        [HttpGet]
        public async void DeleteEmailNotification(Guid emailNotificationId)
        {
            var emailNotificationsReceiversList = _emailNotificationReceiversRepository.GetAll().Where(x => x.EMailNotificationId == emailNotificationId);
            
            foreach (var emailNotificationsReceiver in emailNotificationsReceiversList)
            {
                await _emailNotificationReceiversRepository.DeleteAsync(emailNotificationsReceiver.Id);
            }

            await _emailNotificationsRepository.DeleteAsync(emailNotificationId);
        }
        #endregion

        #region Consortiums

        [HttpGet]
        public async Task<ConsortiumsDto> FindConsortium(Guid consortiumId)
        {
            var consortium = await _consortiumsRepository.FirstOrDefaultAsync(x => x.Id == consortiumId);
            return ObjectMapper.Map<ConsortiumsDto>(consortium);
        }

        [HttpPost]
        public async void AddConsortium(ConsortiumsDto consortium)
        {
            await _consortiumsRepository.InsertAndGetIdAsync(ObjectMapper.Map<Consortiums>(consortium));
        }

        [HttpPost]
        public async void UpdateConsortium(ConsortiumsDto consortium)
        {
            Consortiums consortiumToUpdate = _consortiumsRepository.FirstOrDefault(x => x.Id == consortium.Id);

            await _consortiumsRepository.UpdateAsync(ObjectMapper.Map<Consortiums>(consortiumToUpdate));
        }

        [HttpGet]
        public async void DeleteConsortium(Guid consortiumId)
        {
            var firmConsortiumList = _firmConsortiumRepository.GetAll().Where(x => x.ConsortiumId == consortiumId);
            foreach (var firmConsortium in firmConsortiumList)
            {
                await _firmConsortiumRepository.DeleteAsync(firmConsortium.Id);
            }
            await _consortiumsRepository.DeleteAsync(consortiumId);
        }
        #endregion

        #region FirmConsortium

        [HttpPost]
        public async Task<List<FirmConsortiumDto>> GetFirmsOfConsortiumByConsortiumId(Guid consortiumId)
        {
            var firmsList = _firmConsortiumRepository.GetAllIncluding(x => x.Firm, x => x.Firm.Country).Where(x => x.ConsortiumId == consortiumId);
            firmsList.OrderBy(x => x.FirmRole);
            return ObjectMapper.Map<List<FirmConsortiumDto>>(firmsList);
        }

        [HttpPost]
        public async Task<List<FirmConsortiumDto>> GetConsortiumsOfTenderByTenderId(Guid tenderId)
        {
            var consortiumsList = _firmConsortiumRepository.GetAllIncluding(x => x.Firm, x => x.Firm.Country, x => x.Consortium).Where(x => x.Consortium.TenderId == tenderId && x.FirmRole == (int)EFirmRoleInConsortium.Leader);
            return ObjectMapper.Map<List<FirmConsortiumDto>>(consortiumsList);
        }

        [HttpPost]
        public async Task<List<FirmConsortiumDto>> GetConsortiumFirms(Guid consortiumId)
        {
            var firmList = _firmConsortiumRepository.GetAllIncluding(x => x.Firm, x => x.Firm.Country).Where(x => x.ConsortiumId == consortiumId);
            return ObjectMapper.Map<List<FirmConsortiumDto>>(firmList);
        }

        [HttpPost]
        public async void AddUpdateConsortiumFirms(FirmConsortiumDto[] newFirmConsortiumList, Guid tenderId, Guid? consortiumId = null)
        {
            if (consortiumId == null)
            {
                ConsortiumsDto newConsortium = new ConsortiumsDto();
                newConsortium.TenderId = tenderId;
                consortiumId = await _consortiumsRepository.InsertAndGetIdAsync(ObjectMapper.Map<Consortiums>(newConsortium));

                foreach (var newFirmConsortium in newFirmConsortiumList)
                {
                    newFirmConsortium.ConsortiumId = (Guid)consortiumId;
                    newFirmConsortium.Firm = null;
                    await _firmConsortiumRepository.InsertAndGetIdAsync(ObjectMapper.Map<FirmConsortium>(newFirmConsortium));
                }
            }
            else
            {
                var existingFirmConsortiumList = _firmConsortiumRepository.GetAll().Where(x => x.ConsortiumId == consortiumId).ToList();

                foreach (var existingFirmConsortium in existingFirmConsortiumList)
                {
                    bool firmConsortiumExistInNew = newFirmConsortiumList.Any(item => item.Id == existingFirmConsortium.Id);
                    if (!firmConsortiumExistInNew)
                    {
                        await _firmConsortiumRepository.DeleteAsync(existingFirmConsortium.Id);
                    }
                }

                foreach (var newFirmConsortium in newFirmConsortiumList)
                {
                    bool firmConsortiumExistInOld = existingFirmConsortiumList.Any(item => item.Id == newFirmConsortium.Id);
                    if (!firmConsortiumExistInOld)
                    {
                        newFirmConsortium.Firm = null;
                        newFirmConsortium.Consortium = null;
                        await _firmConsortiumRepository.InsertAndGetIdAsync(ObjectMapper.Map<FirmConsortium>(newFirmConsortium));
                    }
                    else
                    {
                        var firmConsortiumToUpdate = existingFirmConsortiumList.FirstOrDefault(x => x.Id == newFirmConsortium.Id);
                        firmConsortiumToUpdate.Firm = null;
                        firmConsortiumToUpdate.Consortium = null;
                        firmConsortiumToUpdate.FirmRole = newFirmConsortium.FirmRole;
                        await _firmConsortiumRepository.UpdateAsync(ObjectMapper.Map<FirmConsortium>(firmConsortiumToUpdate));
                    }
                }
            }
        }

        [HttpPost]
        public async void AddFirmConsortium(FirmConsortiumDto firmConsortium)
        {
            await _firmConsortiumRepository.InsertAndGetIdAsync(ObjectMapper.Map<FirmConsortium>(firmConsortium));
        }

        [HttpPost]
        public async void UpdateFirmConsortium(FirmConsortiumDto firmConsortium)
        {
            await _firmConsortiumRepository.UpdateAsync(ObjectMapper.Map<FirmConsortium>(firmConsortium));
        }

        [HttpGet]
        public async void DeleteFirmConsortium(Guid firmConsortiumId)
        {
            await _firmConsortiumRepository.DeleteAsync(firmConsortiumId);
        }

        #endregion

        #region EmailNotificationReceivers

        [HttpPost]
        public async Task<List<EmailNotificationReceiversDto>> GetEmailNotificationReceiversForSelectBox()
        {
            var emailNotificationReceiversList = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User, x => x.EMailNotification);
            return ObjectMapper.Map<List<EmailNotificationReceiversDto>>(emailNotificationReceiversList);
        }

        [HttpPost]
        public async void AddEmailNotificationReceivers(EmailNotificationReceiversDto[] emailNotificationReceiversList)
        {
            foreach (var emailNotificationReceiver in emailNotificationReceiversList)
            {
                await _emailNotificationReceiversRepository.InsertAndGetIdAsync(ObjectMapper.Map<EmailNotificationReceivers>(emailNotificationReceiver));
            }
        }

        [HttpGet]
        public async void DeleteEmailNotificationReceiver(Guid emailNotificationReceiverId)
        {
            await _emailNotificationReceiversRepository.DeleteAsync(emailNotificationReceiverId);
        }

        #endregion

        #region ContactAreas

        [HttpPost]
        public async Task<List<ContactAreasDto>> GetContactAreaForSelectBox()
        {
            var contactAreaList = _contactAreasRepository.GetAllIncluding(x => x.Area, x => x.Contact);
            return ObjectMapper.Map<List<ContactAreasDto>>(contactAreaList);
        }

        [HttpPost]
        public async void AddContactArea(ContactAreasDto[] contactAreaList)
        {
            foreach (var contactArea in contactAreaList)
            {
                await _contactAreasRepository.InsertAndGetIdAsync(ObjectMapper.Map<ContactAreas>(contactArea));
            }
        }

        [HttpGet]
        public async void DeleteContactArea(Guid contactAreaId)
        {
            await _contactAreasRepository.DeleteAsync(contactAreaId);
        }

        #endregion

        #region ContactChannel

        [HttpPost]
        public async Task<List<ContactChannelDto>> GetContactChannelByContactIdForTable(Guid contactId)
        {
            var contactChannelList = _contactChannelRepository.GetAllIncluding(x => x.Contact, x => x.ChannelType).Where(x => x.ContactId == contactId);
            return ObjectMapper.Map<List<ContactChannelDto>>(contactChannelList);
        }

        [HttpGet]
        public async Task<ContactChannelDto> FindContactChannel(Guid contactChannelId)
        {
            var contactChannel = await _contactChannelRepository.FirstOrDefaultAsync(x => x.Id == contactChannelId);
            return ObjectMapper.Map<ContactChannelDto>(contactChannel);
        }

        [HttpPost]
        public async void AddContactChannel(ContactChannelDto contactChannel)
        {
            await _contactChannelRepository.InsertAndGetIdAsync(ObjectMapper.Map<ContactChannel>(contactChannel));
        }

        [HttpPost]
        public async void UpdateContactChannel(ContactChannelDto contactChannel)
        {
            await _contactChannelRepository.UpdateAsync(ObjectMapper.Map<ContactChannel>(contactChannel));
        }

        [HttpGet]
        public async void DeleteContactChannel(Guid contactChannelId)
        {
            await _contactChannelRepository.DeleteAsync(contactChannelId);
        }

        #endregion

        #region ContactNotes

        [HttpPost]
        public async Task<ListResultDto<ContactNotesDto>> GetContactNotesForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var res = _contactNotesRepository.GetAllIncluding(x => x.Contact).Where(LinqBuilder.WhereStatementBuilder(searchParamList));
            var contactNoteList = res.Skip((page - 1) * maxResult).Take(maxResult).OrderByDescending(x => x.CreationTime);
            var totalItems = res.Count();

            ListResultDto<ContactNotesDto> result = new ListResultDto<ContactNotesDto>();
            result.totalItemCount = totalItems;
            result.itemList = ObjectMapper.Map<List<ContactNotesDto>>(contactNoteList);
            return result;
        }

        [HttpPost]
        public async Task<List<ContactNotesDto>> GetContactNotesByIdForTable(Guid contactId)
        {
            var contactNotesList = _contactNotesRepository.GetAllIncluding(x => x.Contact).Where(x => x.ContactId == contactId);
            return ObjectMapper.Map<List<ContactNotesDto>>(contactNotesList);
        }

        [HttpGet]
        public async Task<ContactNotesDto> FindContactNote(Guid contactNoteId)
        {
            var contactNote = _contactNotesRepository.GetAllIncluding(x => x.Contact, x => x.User).Where(x => x.Id == contactNoteId).FirstOrDefault();
            return ObjectMapper.Map<ContactNotesDto>(contactNote);
        }

        [HttpPost]
        public async void AddContactNotes(ContactNotesDto contactNote)
        {
            await _contactNotesRepository.InsertAndGetIdAsync(ObjectMapper.Map<ContactNotes>(contactNote));
        }

        [HttpPost]
        public async void UpdateContactNotes(ContactNotesDto contactNote)
        {
            await _contactNotesRepository.UpdateAsync(ObjectMapper.Map<ContactNotes>(contactNote));
        }

        [HttpGet]
        public async void DeleteContactNotes(Guid contactNoteId)
        {
            await _contactNotesRepository.DeleteAsync(contactNoteId);
        }

        #endregion

        #region ContactExperiences

        [HttpPost]
        public async Task<List<ContactExperiencesDto>> GetContactExperiencesByIdForTable(Guid contactId)
        {
            var contactExperienceList = _contactExperiencesRepository.GetAllIncluding(x => x.Contact, x => x.Tender).Where(x => x.ContactId == contactId);
            return ObjectMapper.Map<List<ContactExperiencesDto>>(contactExperienceList);
        }

        [HttpPost]
        public async void AddContactExperience(ContactExperiencesDto contactExperience)
        {
            await _contactExperiencesRepository.InsertAndGetIdAsync(ObjectMapper.Map<ContactExperiences>(contactExperience));
        }

        [HttpPost]
        public async void UpdateContactExperience(ContactExperiencesDto contactExperience)
        {
            await _contactExperiencesRepository.UpdateAsync(ObjectMapper.Map<ContactExperiences>(contactExperience));
        }

        [HttpGet]
        public async void DeleteContactExperience(Guid contactExperienceId)
        {
            await _contactExperiencesRepository.DeleteAsync(contactExperienceId);
        }

        #endregion

        #region ContactFirm

        [HttpPost]
        public async Task<List<ContactFirmDto>> GetContactFirmForTable()
        {
            var contactFirmList = _contactFirmRepository.GetAllIncluding(x => x.Contact, x => x.Firm);
            return ObjectMapper.Map<List<ContactFirmDto>>(contactFirmList);
        }

        [HttpPost]
        public async Task<List<ContactFirmDto>> getContactFirmForTableByFirmId(Guid firmId)
        {
            var contactFirmList = _contactFirmRepository.GetAllIncluding(x => x.Contact).Where(x => x.FirmId == firmId && x.IsActive == true).OrderBy(x => x.Contact.Surname);
            return ObjectMapper.Map<List<ContactFirmDto>>(contactFirmList);
        }

        [HttpGet]
        public async Task<ContactFirmDto> FindContactFirmByContactId(Guid contactId)
        {
            var contactFirm = _contactFirmRepository.GetAllIncluding(x => x.Firm).Where(x => x.ContactId == contactId && x.IsActive == true).FirstOrDefault();
            return ObjectMapper.Map<ContactFirmDto>(contactFirm);
        }

        [HttpPost]
        public async void AddContactFirm(ContactFirmDto contactFirm)
        {
            await _contactFirmRepository.InsertAndGetIdAsync(ObjectMapper.Map<ContactFirm>(contactFirm));
        }

        [HttpPost]
        public async void UpdateContactFirm(ContactFirmDto contactFirm)
        {
            await _contactFirmRepository.UpdateAsync(ObjectMapper.Map<ContactFirm>(contactFirm));
        }

        [HttpGet]
        public async void DeleteContactFirm(Guid contactFirmId)
        {
            await _contactFirmRepository.DeleteAsync(contactFirmId);
        }

        #endregion

        #region FirmAreas

        [HttpPost]
        public async Task<List<FirmAreasDto>> GetFirmAreaForSelectBox()
        {
            var firmAreaList = _firmAreasRepository.GetAllIncluding(x => x.Area, x => x.Firm);
            return ObjectMapper.Map<List<FirmAreasDto>>(firmAreaList);
        }

        [HttpPost]
        public async void AddFirmArea(FirmAreasDto[] firmAreaList)
        {
            foreach (var firmArea in firmAreaList)
            {
                await _firmAreasRepository.InsertAndGetIdAsync(ObjectMapper.Map<FirmAreas>(firmArea));
            }
        }

        [HttpGet]
        public async void DeleteFirmArea(Guid firmAreaId)
        {
            await _firmAreasRepository.DeleteAsync(firmAreaId);
        }

        #endregion

        #region TenderAreas

        [HttpPost]
        public async Task<List<TenderAreasDto>> GetTenderAreaForSelectBox()
        {
            var tenderAreaList = _tenderAreasRepository.GetAllIncluding(x => x.Area, x => x.Tender);
            return ObjectMapper.Map<List<TenderAreasDto>>(tenderAreaList);
        }

        [HttpPost]
        public async void AddTenderArea(TenderAreasDto[] tenderAreaList)
        {
            foreach (var tenderArea in tenderAreaList)
            {
                await _tenderAreasRepository.InsertAndGetIdAsync(ObjectMapper.Map<TenderAreas>(tenderArea));
            }
        }

        [HttpGet]
        public async void DeleteTenderArea(Guid tenderAreaId)
        {
            await _tenderAreasRepository.DeleteAsync(tenderAreaId);
        }

        #endregion

        #region CustomMethods

        [HttpPost]
        public async Task<List<OldTendersOfFirmDto>> GetOldTendersOfFirm(Guid firmId)
        {
            List<OldTendersOfFirmDto> oldTenderList = new List<OldTendersOfFirmDto>();
            var firmConsortiumList = _firmConsortiumRepository.GetAllIncluding(x => x.Firm, x => x.Consortium, x => x.Consortium.Tender, x => x.Consortium.Tender.Currency).Where(x => x.FirmId == firmId).ToList();

            foreach (var firmConsortium in firmConsortiumList)
            {
                OldTendersOfFirmDto oldTender = new OldTendersOfFirmDto
                {
                    Year = firmConsortium.Consortium.Tender.OpeningDate.Value.Year,
                    TenderNumber = firmConsortium.Consortium.Tender.TenderNumber,
                    Title = firmConsortium.Consortium.Tender.Title,
                    TechnicalScore = firmConsortium.Consortium.Tender.AwardedTechnicalScore,
                    FinancialScore = firmConsortium.Consortium.Tender.AwardedFinancialScore,
                    TotalScore = firmConsortium.Consortium.Tender.AwardedTotalScore,
                    MaximumBudget = firmConsortium.Consortium.Tender.MaximumBudget,
                    Currency = firmConsortium.Consortium.Tender.Currency.CurrencyCode,
                    AwardedPrice = firmConsortium.Consortium.Tender.AwardedPrice,
                    Discount = (float)1 - ((float?)firmConsortium.Consortium.Tender.AwardedPrice / (float?)firmConsortium.Consortium.Tender.MaximumBudget),

                    Role = firmConsortium.FirmRole switch
                    {
                        (int)EFirmRole.Leader => "Leader",
                        _ => "Member",
                    },

                    Result = firmConsortium.Consortium.Tender.StatusId switch
                    {
                        (int)EStatus.Awarded => firmConsortium.Consortium.Tender.AwardedConsortiumId == firmConsortium.ConsortiumId ? "Won" : "Lost",
                        (int)EStatus.Cancelled => "Cancelled",
                        _ => "Unannounced",
                    }
                };

                oldTenderList.Add(oldTender);
            }

            return oldTenderList.OrderByDescending(x => x.Year).ToList();
        }

        [HttpPost]
        public async Task<ShortlistResultsOfFirmDto> GetShortlistCountsWithRole(Guid firmId)
        {
            var shortlistResults = _shortlistResultsOfFirmRepository.FirstOrDefault(x => x.Id == firmId);
            var shortlistResultsDto = ObjectMapper.Map<ShortlistResultsOfFirmDto>(shortlistResults);
            shortlistResultsDto.TotalNumberAsLeader = shortlistResultsDto.TotalAwardAsLeader + shortlistResultsDto.TotalUnannouncedAsLeader + shortlistResultsDto.TotalLostAsLeader + shortlistResultsDto.TotalCancelledAsLeader;
            shortlistResultsDto.TotalNumberAsMember = shortlistResultsDto.TotalAwardAsMember + shortlistResultsDto.TotalUnannouncedAsMember + shortlistResultsDto.TotalLostAsMember + shortlistResultsDto.TotalCancelledAsMember;
            shortlistResultsDto.TotalNumber = shortlistResultsDto.TotalNumberAsLeader + shortlistResultsDto.TotalNumberAsMember;

            if (shortlistResultsDto.TotalNumber != null && shortlistResultsDto.TotalNumber != 0)
            {
                shortlistResultsDto.RatioAsLeader = Math.Round((decimal)((decimal?)shortlistResultsDto.TotalNumberAsLeader / (decimal?)shortlistResultsDto.TotalNumber), 2);
                shortlistResultsDto.RatioAsMember = Math.Round((decimal)((decimal?)shortlistResultsDto.TotalNumberAsMember / (decimal?)shortlistResultsDto.TotalNumber), 2);
            }

            return shortlistResultsDto;
        }

        [HttpPost]
        public async Task<ScoreStatisticsOfFirmAllResultsDto> GetScoreStatisticsOfFirm(Guid firmId)
        {
            ScoreStatisticsOfFirmAsLeader scoresOfFirmAsLeader = await _scoreStatisticsOfFirmAsLeaderRepository.FirstOrDefaultAsync(x => x.Id == firmId);
            ScoreStatisticsOfFirmAsMember scoresOfFirmAsMember = await _scoreStatisticsOfFirmAsMemberRepository.FirstOrDefaultAsync(x => x.Id == firmId);
            ScoreStatisticsOfFirmTotal scoresOfFirmTotal = await _scoreStatisticsOfFirmTotalRepository.FirstOrDefaultAsync(x => x.Id == firmId);
            ScoreStatisticsOfFirmAllResultsDto overallScores = new ScoreStatisticsOfFirmAllResultsDto();
            overallScores.ScoresForLeader = ObjectMapper.Map<ScoreStatisticsOfFirmAsLeaderDto>(scoresOfFirmAsLeader);
            overallScores.ScoresForMember = ObjectMapper.Map<ScoreStatisticsOfFirmAsMemberDto>(scoresOfFirmAsMember);
            overallScores.ScoresForTotal = ObjectMapper.Map<ScoreStatisticsOfFirmTotalDto>(scoresOfFirmTotal);
            return overallScores;
        }

        [HttpPost]
        public async Task<FirmComparisonMutualTendersDto> GetMutualTendersOfTwoFirms(Guid firstFirmId, Guid secondFirmId)
        {
            var firstFirmTenderList = _firmConsortiumTenderRepository.GetAll().Where(x => x.FirmId == firstFirmId).ToList();
            var secondFirmTenderList = _firmConsortiumTenderRepository.GetAll().Where(x => x.FirmId == secondFirmId).ToList();
            var unannouncedList = new List<MutualTendersComparisonDto>();
            var firstFirmAwardedList = new List<MutualTendersComparisonDto>();
            var secondFirmAwardedList = new List<MutualTendersComparisonDto>();
            var bothWonList = new List<MutualTendersComparisonDto>();
            var bothLostList = new List<MutualTendersComparisonDto>();

            foreach (var tender in firstFirmTenderList)
            {
                bool exists = secondFirmTenderList.Any(item => item.TenderNumber == tender.TenderNumber);
                if (exists)
                {
                    var tenderInSecondFirmTenderList = secondFirmTenderList.Where(x => x.TenderNumber == tender.TenderNumber).FirstOrDefault();
                    MutualTendersComparisonDto mutualTender = new MutualTendersComparisonDto
                    {
                        Year = tender.Year,
                        TenderNumber = tender.TenderNumber,
                        TenderName = tender.TenderName,
                        FirstFirmRole = tender.FirmRole,
                        SecondFirmRole = tenderInSecondFirmTenderList.FirmRole
                    };

                    switch (tender.StatusId)
                    {
                        case (int)EStatus.Awarded:
                            if (tender.AwardedConsortiumId == tender.ConsortiumId && tender.AwardedConsortiumId != tenderInSecondFirmTenderList.ConsortiumId)
                            {
                                firstFirmAwardedList.Add(mutualTender);
                            }
                            else if (tender.AwardedConsortiumId == tenderInSecondFirmTenderList.ConsortiumId && tender.AwardedConsortiumId != tender.ConsortiumId)
                            {
                                secondFirmAwardedList.Add(mutualTender);
                            }
                            else if (tender.AwardedConsortiumId == tenderInSecondFirmTenderList.ConsortiumId && tender.AwardedConsortiumId == tender.ConsortiumId)
                            {
                                bothWonList.Add(mutualTender);
                            }
                            else
                            {
                                bothLostList.Add(mutualTender);
                            }
                            break;
                        default:
                            unannouncedList.Add(mutualTender);
                            break;
                    }
                }
            }

            var firmComparisonMutualTendersList = new FirmComparisonMutualTendersDto
            {
                UnannouncedTenders = ObjectMapper.Map<List<MutualTendersComparisonDto>>(unannouncedList),
                FirstFirmAwardedTenders = ObjectMapper.Map<List<MutualTendersComparisonDto>>(firstFirmAwardedList),
                SecondFirmAwardedTenders = ObjectMapper.Map<List<MutualTendersComparisonDto>>(secondFirmAwardedList),
                BothLostTenders = ObjectMapper.Map<List<MutualTendersComparisonDto>>(bothLostList),
                BothWonTenders = ObjectMapper.Map<List<MutualTendersComparisonDto>>(bothWonList)
            };

            return firmComparisonMutualTendersList;
        }

        [HttpPost]

        public async Task<List<AycTenderDto>> GetAycTenders()
        {
            List<string> preferences = new List<string> { "AycIsAwarded", "WaitingForAward", "OfferBeingPrepared", "WaitingForShortlist", "PreparingToAttend", "AycHasLost", "TenderCancelled" };
            List<FirmConsortium> firmConsortiumList = _firmConsortiumRepository.GetAllIncluding(x => x.Consortium.Tender, x => x.Consortium.Tender.ContractingAuthority).Where(x => x.FirmId.ToString() == CustomConstants.AycDatabaseId).ToList();
            List<AycTenderDto> aycTenderList = new List<AycTenderDto>();

            foreach (var firmConsortium in firmConsortiumList)
            {
                var partnerList = _firmConsortiumRepository.GetAllIncluding(x => x.Firm, x => x.Firm.Country).Where(x => x.ConsortiumId == firmConsortium.ConsortiumId).ToList().OrderBy(x => x.FirmRole);

                AycTenderDto aycTender = new AycTenderDto
                {
                    ProjectName = firmConsortium.Consortium.Tender.Title,
                    TenderNumber = firmConsortium.Consortium.Tender.TenderNumber,
                    ContractingAuthority = firmConsortium.Consortium.Tender.ContractingAuthority.Name,
                    PartnerList = new List<TenderPartnerDto>()
                };

                foreach (var partner in partnerList)
                {
                    TenderPartnerDto tenderPartner = new TenderPartnerDto
                    {
                        Name = partner.Firm.Name + " (" + partner.Firm.Country.CountryName + ")"
                    };

                    tenderPartner.Role = partner.FirmRole switch
                    {
                        (long)EFirmRole.Leader => "Leader",
                        _ => "Member",
                    };

                    aycTender.PartnerList.Add(tenderPartner);
                }

                switch (firmConsortium.Consortium.Tender.StatusId)
                {
                    case (long)EStatus.Open:
                        aycTender.Status = "PreparingToAttend";
                        break;
                    case (long)EStatus.Closed:
                        aycTender.Status = "WaitingForShortlist";
                        break;
                    case (long)EStatus.Shortlisted:
                        if (firmConsortium.Consortium.Tender.ShortlistDeadlineDate != null && firmConsortium.Consortium.Tender.ShortlistDeadlineDate <= DateTime.Today.Date)
                        {
                            aycTender.Status = "OfferBeingPrepared";
                        }
                        else
                        {
                            aycTender.Status = "WaitingForAward";
                        }
                        break;
                    case (long)EStatus.Awarded:
                        if (firmConsortium.Consortium.Tender.AwardedConsortiumId == firmConsortium.ConsortiumId)
                        {
                            aycTender.Status = "AycIsAwarded";
                        }
                        else
                        {
                            aycTender.Status = "AycHasLost";
                        }
                        break;
                    case (long)EStatus.Cancelled:
                        aycTender.Status = "TenderCancelled";
                        break;
                    default:
                        break;
                }

                aycTenderList.Add(aycTender);
            }

            return aycTenderList.OrderBy(item => preferences.IndexOf(item.Status)).ToList();
        }

        [HttpPost]

        public async Task<List<AycPartnerDto>> GetAycPartners()
        {
            var partnerWithTendersList = new List<AycPartnerDto>();
            List<Guid> firmConsortiumIdList = _firmConsortiumRepository.GetAllIncluding(x => x.Consortium.Tender, x => x.Firm, x => x.Firm.Country).Where(x => x.FirmId.ToString() == CustomConstants.AycDatabaseId).Select(x => x.ConsortiumId).ToList();
            List<FirmConsortium> partnerList = new List<FirmConsortium>();
            List<Firms> partnerListDistinct = new List<Firms>();

            foreach (var firmConsortiumId in firmConsortiumIdList)
            {
                partnerList = partnerList.Concat(_firmConsortiumRepository.GetAllIncluding(x => x.Consortium.Tender, x => x.Firm, x => x.Firm.Country).Where(x => x.ConsortiumId == firmConsortiumId && x.FirmId.ToString() != CustomConstants.AycDatabaseId).ToList()).ToList();
            }

            partnerListDistinct = partnerList.Select(x => x.Firm).Distinct().ToList();

            foreach (var partner in partnerListDistinct)
            {
                AycPartnerDto aycPartner = new AycPartnerDto
                {
                    PartnerName = partner.Name + " (" + partner.Country.CountryName + ")",
                    TenderList = ObjectMapper.Map<List<TendersDto>>(partnerList.Where(x => x.FirmId == partner.Id).Select(x => x.Consortium.Tender).ToList()),
                    TenderCount = ObjectMapper.Map<List<TendersDto>>(partnerList.Where(x => x.FirmId == partner.Id).Select(x => x.Consortium.Tender).ToList()).Count()
                };
                partnerWithTendersList.Add(aycPartner);
            }

            return partnerWithTendersList.OrderBy(x => x.PartnerName).ToList();
        }

        [HttpPost]

        public async Task<TenderStatusCountDto> GetTenderStatusCounts()
        {
            var tenders = _tendersRepository.GetAll().ToList();
            TenderStatusCountDto tenderStatusCount = new TenderStatusCountDto
            {
                Forecasted = tenders.Where(x => x.StatusId == (long)EStatus.Forecast).Count(),
                Opened = tenders.Where(x => x.StatusId == (long)EStatus.Open).Count(),
                Closed = tenders.Where(x => x.StatusId == (long)EStatus.Closed).Count(),
                Shortlisted = tenders.Where(x => x.StatusId == (long)EStatus.Shortlisted).Count(),
                Awarded = tenders.Where(x => x.StatusId == (long)EStatus.Awarded).Count(),
                Cancelled = tenders.Where(x => x.StatusId == (long)EStatus.Cancelled).Count()
            };
            return tenderStatusCount;

        }

        [HttpPost]
        public async Task<List<FirmYearlyResultDto>> GetYearlyResultsOfFirm(Guid firmId)
        {
            int earliestYear = _tendersRepository.GetAll().OrderBy(x => x.OpeningDate).FirstOrDefault().OpeningDate.Value.Year;
            int latestYear = DateTime.Now.Year;
            int[] yearArray = Enumerable.Range(earliestYear, latestYear - earliestYear + 1).ToArray();
            var firmJoinedTendersList = _firmConsortiumRepository.GetAllIncluding(x => x.Consortium.Tender).Where(x => x.FirmId == firmId).Select(x => x.Consortium);
            List<FirmYearlyResultDto> firmYearlyResultList = new List<FirmYearlyResultDto>();

            foreach (int year in yearArray)
            {
                FirmYearlyResultDto firmYearlyResult = new FirmYearlyResultDto
                {
                    Year = year,
                    AwardedCount = firmJoinedTendersList.Where(x => x.Tender.OpeningDate.Value.Year == year && x.Tender.AwardedConsortiumId == x.Id).Count(),
                    LostCount = firmJoinedTendersList.Where(x => x.Tender.OpeningDate.Value.Year == year && x.Tender.AwardedConsortiumId != x.Id && x.Tender.StatusId == (long)EStatus.Awarded).Count(),
                    UnannouncedCount = firmJoinedTendersList.Where(x => x.Tender.OpeningDate.Value.Year == year && x.Tender.StatusId == (long)EStatus.Shortlisted).Count(),
                    CancelledCount = firmJoinedTendersList.Where(x => x.Tender.OpeningDate.Value.Year == year && x.Tender.StatusId == (long)EStatus.Cancelled).Count(),
                    TotalCount = firmJoinedTendersList.Where(x => x.Tender.OpeningDate.Value.Year == year).Count()
                };

                firmYearlyResultList.Add(firmYearlyResult);
            }

            return firmYearlyResultList;
        }

        [HttpPost]
        public async void TransferDuplicatedFirms(Guid duplicatedFirmId, Guid originalFirmId)
        {
            var originalFirm = _firmsRepository.FirstOrDefault(x => x.Id == originalFirmId);
            var firmConsortiumList = _firmConsortiumRepository.GetAll().Where(x => x.FirmId == duplicatedFirmId);

            foreach (var firmConsortium in firmConsortiumList)
            {
                firmConsortium.FirmId = originalFirmId;
                firmConsortium.Firm = originalFirm;
                await _firmConsortiumRepository.UpdateAsync(firmConsortium);
            }

            var firmAreaList = _firmAreasRepository.GetAll().Where(x => x.FirmId == duplicatedFirmId);

            foreach (var firmArea in firmAreaList)
            {
                firmArea.FirmId = originalFirmId;
                firmArea.Firm = originalFirm;
                await _firmAreasRepository.UpdateAsync(firmArea);
            }

            var contactFirmList = _contactFirmRepository.GetAll().Where(x => x.FirmId == duplicatedFirmId);

            foreach (var contactFirm in contactFirmList)
            {
                contactFirm.FirmId = originalFirmId;
                contactFirm.Firm = originalFirm;
                await _contactFirmRepository.UpdateAsync(contactFirm);
            }

            await _firmsRepository.DeleteAsync(duplicatedFirmId);
        }

        #endregion

        #region MailServices

        public async void SendMailAboutTender(string sendTo, EEMailNotifications mailTopic, string mailBody)
        {
            // Mail setup
            var fromAddress = new MailAddress("","");
            var toAddress = new MailAddress(sendTo, sendTo);
            string subject = "";

            var smtp = new SmtpClient
            {
                Host = "",
                Port = 000,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential("", "")
            }; ;

            const string mailHeader = "<h4>This is an automatic message from AYC Consultancy mail server. You are receiving this mail for the following reason:<h4>";
            const string mailFooter = "<h4>Ayc Danışmanlık Turizm İç ve Dış Ticaret Limited Şirketi<h4>";
            string mailReason = "";

            switch (mailTopic)
            {
                case EEMailNotifications.TenderAdded:
                    subject = "New Added Tender";
                    mailReason = "<p>The following tender has been added to the system:</p>";

                    break;
                case EEMailNotifications.TenderOpened:
                    subject = "Opened Tender";
                    mailReason = "<p>The following tender has been opened:</p>";
                    break;
                case EEMailNotifications.TenderClosed:
                    subject = "Closed Tender";
                    mailReason = "<p>The following tender has been closed:</p>";
                    break;
                case EEMailNotifications.TenderShortlisted:
                    subject = "Shortlisted Tender";
                    mailReason = "<p>The following tender has been shortlisted:</p>";
                    break;
                case EEMailNotifications.TenderAwarded:
                    subject = "Awarded Tender";
                    mailReason = "<p>The following tender has been awarded:</p>";
                    break;
                case EEMailNotifications.TenderDeadlineTomorrow:
                    subject = "Tender Deadline (Tomorrow)";
                    mailReason = "<p>The following tender has deadline for tomorrow" + DateTime.Today.Date.AddDays(1).ToShortDateString() + ":</p>";
                    break;
                case EEMailNotifications.TenderDeadlineNextWeek:
                    subject = "Tender Deadline (Next Week)";
                    mailReason = "<p>The following tender has deadline for next week" + DateTime.Today.Date.AddDays(7).ToShortDateString() + ":</p>";
                    break;
                case EEMailNotifications.TenderDeadlinePassed:
                    subject = "Tender Deadline (Passed)";
                    mailReason = "<p>The following tender has deadline for past date, but not closed:</p>";
                    break;
                default:
                    break;
            }

            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = mailHeader + mailReason + mailBody + mailFooter,
                IsBodyHtml = true
            })
            {
                smtp.Send(message);
            }
        }

        [HttpPost]
        public async void CheckTenderDeadlineTomorrow()
        {
            Guid emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderDeadlineTomorrow)).Id;
            List<string> emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
            string mailBody = "";

            IQueryable<Tenders> tenders = _tendersRepository.GetAllIncluding(x => x.Location);

            List<Tenders> tendersDueTomorrow = tenders.Where(x => x.Deadline == DateTime.Today.Date.AddDays(1)).ToList();

            if (tendersDueTomorrow.Count > 0)
            {
                foreach (var tender in tendersDueTomorrow)
                {
                    mailBody += "<tr><td style='border: 1px solid #ddd; padding: 8px;'>" + tender.Title + "(" + tender.Location.CountryName + "</td></tr></table>";
                }

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderDeadlineTomorrow, mailBody);
                }
            }
        }

        [HttpPost]
        public async void CheckTenderDeadlineNextWeek()
        {
            Guid emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderDeadlineNextWeek)).Id;
            List<string> emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
            string mailBody = "";

            IQueryable<Tenders> tenders = _tendersRepository.GetAllIncluding(x => x.Location);

            List<Tenders> tendersDueNextWeek = tenders.Where(x => x.Deadline == DateTime.Today.Date.AddDays(7)).ToList();

            if (tendersDueNextWeek.Count > 0)
            {
                foreach (var tender in tendersDueNextWeek)
                {
                    mailBody += "<tr><td style='border: 1px solid #ddd; padding: 8px;'>" + tender.Title + "(" + tender.Location.CountryName + "</td></tr></table>";
                }

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderDeadlineNextWeek, mailBody);
                }
            }
        }

        [HttpPost]
        public async void CheckTenderDeadlinePassed()
        {
            Guid emailNotificationId = _emailNotificationsRepository.FirstOrDefault(x => x.Name == Enum.GetName(typeof(EEMailNotifications), EEMailNotifications.TenderDeadlinePassed)).Id;
            List<string> emailAddresses = _emailNotificationReceiversRepository.GetAllIncluding(x => x.User).Where(x => x.EMailNotificationId == emailNotificationId).Select(x => x.User.EmailAddress).ToList();
            string mailBody = "";

            IQueryable<Tenders> tenders = _tendersRepository.GetAllIncluding(x => x.Location);

            List<Tenders> tendersDeadlinePassed = tenders.Where(x => x.Deadline > DateTime.Today.Date && x.StatusId == (long)EStatus.Open).ToList();

            if (tendersDeadlinePassed.Count > 0)
            {
                foreach (var tender in tendersDeadlinePassed)
                {
                    mailBody += "<tr><td style='border: 1px solid #ddd; padding: 8px;'>" + tender.Title + "(" + tender.Location.CountryName + "</td></tr></table>";
                }

                foreach (string emailAddress in emailAddresses)
                {
                    SendMailAboutTender(emailAddress, EEMailNotifications.TenderDeadlinePassed, mailBody);
                }
            }
        }

        #endregion

    }
}