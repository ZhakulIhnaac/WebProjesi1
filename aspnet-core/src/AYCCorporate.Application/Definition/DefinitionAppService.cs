using Abp.Application.Services;
using Abp.Domain.Repositories;
using AYCCorporate.CustomClasses;
using Domain.Dto;
using Domain.Entity;
using IDefinitionAppServices;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Dynamic.Core;
using System.Threading.Tasks;

namespace DefinitionAppServices
{
    public class DefinitionAppService: ApplicationService, IDefinitionAppService
    {
        private readonly IRepository<ChannelType, long> _channelTypeRepository;
        private readonly IRepository<ContractingAuthorities, long> _contractingAuthoritiesRepository;
        private readonly IRepository<Countries, long> _countriesRepository;
        private readonly IRepository<Currency, long> _currencyRepository;
        private readonly IRepository<Funder, long> _funderRepository;
        private readonly IRepository<Status, long> _statusRepository;
        private readonly IRepository<TenderType, long> _tenderTypeRepository;
        private readonly IRepository<WorkingAreas, long> _workingAreasRepository;

        public DefinitionAppService(
            IRepository<ChannelType, long> channelTypeRepository,
            IRepository<ContractingAuthorities, long> contractingAuthoritiesRepository,
            IRepository<Countries, long> countriesRepository,
            IRepository<Currency, long> currencyRepository,
            IRepository<Funder, long> funderRepository,
            IRepository<Status, long> statusRepository,
            IRepository<TenderType, long> tenderTypeRepository,
            IRepository<WorkingAreas, long> workingAreasRepository
            )
        {
            _channelTypeRepository = channelTypeRepository;
            _contractingAuthoritiesRepository = contractingAuthoritiesRepository;
            _countriesRepository = countriesRepository;
            _currencyRepository = currencyRepository;
            _funderRepository = funderRepository;
            _statusRepository = statusRepository;
            _tenderTypeRepository = tenderTypeRepository;
            _workingAreasRepository = workingAreasRepository;
        }

        #region ChannelType

        [HttpPost]
        public async Task<List<ChannelTypeDto>> GetChannelTypeForSelectBox()
        {
            var channelTypeList = await _channelTypeRepository.GetAllListAsync();
            return ObjectMapper.Map<List<ChannelTypeDto>>(channelTypeList);
        }

        [HttpGet]
        public async Task<ChannelTypeDto> FindChannelType(long channelTypeId)
        {
            var channelType = await _channelTypeRepository.FirstOrDefaultAsync(x => x.Id == channelTypeId);
            return ObjectMapper.Map<ChannelTypeDto>(channelType);
        }

        #endregion

        #region Currency

        [HttpPost]
        public async Task<List<CurrencyDto>> GetCurrencyForSelectBox()
        {
            var currencyList = await _currencyRepository.GetAllListAsync();
            return ObjectMapper.Map<List<CurrencyDto>>(currencyList);
        }

        [HttpGet]
        public async Task<CurrencyDto> FindCurrency(long currencyId)
        {
            var currency = await _currencyRepository.FirstOrDefaultAsync(x => x.Id == currencyId);
            return ObjectMapper.Map<CurrencyDto>(currency);
        }

        #endregion

        #region ContractingAuthorities

        [HttpPost]
        public async Task<List<ContractingAuthoritiesDto>> GetContractingAuthoritiesForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var contractingAuthoritiesList = _contractingAuthoritiesRepository.GetAllIncluding().Where(LinqBuilder.WhereStatementBuilder(searchParamList))
                .Skip((page - 1) * maxResult).Take(maxResult);
            return ObjectMapper.Map<List<ContractingAuthoritiesDto>>(contractingAuthoritiesList);
        }

        [HttpPost]
        public async Task<List<ContractingAuthoritiesDto>> GetContractingAuthoritiesForSelectBox()
        {
            var contractingAuthorityList = await _contractingAuthoritiesRepository.GetAllListAsync();
            return ObjectMapper.Map<List<ContractingAuthoritiesDto>>(contractingAuthorityList);
        }

        [HttpGet]
        public async Task<ContractingAuthorities> FindContractingAuthority(long contractingAuthorityId)
        {
            var contractingAuthority = await _contractingAuthoritiesRepository.FirstOrDefaultAsync(x => x.Id == contractingAuthorityId);
            return ObjectMapper.Map<ContractingAuthorities>(contractingAuthority);
        }

        [HttpPost]
        public async void AddContractingAuthority(ContractingAuthorities contractingAuthority)
        {
            var addResult = await _contractingAuthoritiesRepository.InsertAndGetIdAsync(ObjectMapper.Map<ContractingAuthorities>(contractingAuthority));
        }

        [HttpPost]
        public async void UpdateContractingAuthority(ContractingAuthorities contractingAuthority)
        {
            await _contractingAuthoritiesRepository.UpdateAsync(ObjectMapper.Map<ContractingAuthorities>(contractingAuthority));
        }

        [HttpGet]
        public async void DeleteContractingAuthority(long contractingAuthorityId)
        {
            await _contractingAuthoritiesRepository.DeleteAsync(contractingAuthorityId);
        }
        #endregion

        #region Countries

        [HttpPost]
        public async Task<List<CountriesDto>> GetCountryForSelectBox()
        {
            var countriesList = await _countriesRepository.GetAllListAsync();
            return ObjectMapper.Map<List<CountriesDto>>(countriesList);
        }

        [HttpGet]
        public async Task<CountriesDto> FindCountry(long countriesId)
        {
            var countries = _countriesRepository.FirstOrDefaultAsync(x => x.Id == countriesId);
            await countries;
            return ObjectMapper.Map<CountriesDto>(countries);
        }

        #endregion

        #region Status

        [HttpPost]
        public async Task<List<StatusDto>> GetStatusForSelectBox()
        {
            var statusList = await _statusRepository.GetAllListAsync();
            return ObjectMapper.Map<List<StatusDto>>(statusList);
        }

        [HttpGet]
        public async Task<StatusDto> FindStatus(long statusId)
        {
            var status = await _statusRepository.FirstOrDefaultAsync(x => x.Id == statusId);
            return ObjectMapper.Map<StatusDto>(status);
        }

        #endregion

        #region TenderType

        [HttpPost]
        public async Task<List<TenderTypeDto>> GetTenderTypeForSelectBox()
        {
            var tenderTypeList = await _tenderTypeRepository.GetAllListAsync();
            return ObjectMapper.Map<List<TenderTypeDto>>(tenderTypeList);
        }

        [HttpGet]
        public async Task<TenderTypeDto> FindTenderType(long tenderTypeId)
        {
            var tenderType = await _tenderTypeRepository.FirstOrDefaultAsync(x => x.Id == tenderTypeId);
            return ObjectMapper.Map<TenderTypeDto>(tenderType);
        }

        #endregion

        #region Funders

        [HttpPost]
        public async Task<List<FunderDto>> GetFunderForTable(int maxResult, int page, SearchParamList searchParamList)
        {
            var funderList = _funderRepository.GetAll();
            return ObjectMapper.Map<List<FunderDto>>(funderList);
        }

        [HttpPost]
        public async Task<List<FunderDto>> GetFunderForSelectBox()
        {
            var funderList = await _funderRepository.GetAllListAsync();
            funderList.OrderBy(x => x.FunderName);
            return ObjectMapper.Map<List<FunderDto>>(funderList);
        }

        [HttpGet]
        public async Task<FunderDto> FindFunder(long funderId)
        {
            var funder = await _funderRepository.FirstOrDefaultAsync(x => x.Id == funderId);
            return ObjectMapper.Map<FunderDto>(funder);
        }

        [HttpPost]
        public async void AddFunder(FunderDto funder)
        {
            await _funderRepository.InsertAndGetIdAsync(ObjectMapper.Map<Funder>(funder));
        }

        [HttpPost]
        public async void UpdateFunder(FunderDto funder)
        {
            await _funderRepository.UpdateAsync(ObjectMapper.Map<Funder>(funder));
        }

        [HttpGet]
        public async void DeleteFunder(long funderId)
        {
            await _funderRepository.DeleteAsync(funderId);
        }

        #endregion

        #region WorkingAreas

        [HttpPost]
        public async Task<List<WorkingAreasDto>> GetWorkingAreaForSelectBox()
        {
            var workingAreaList = await _workingAreasRepository.GetAllListAsync();
            workingAreaList.OrderBy(x => x.AreaName);
            return ObjectMapper.Map<List<WorkingAreasDto>>(workingAreaList);
        }

        #endregion

    }
}