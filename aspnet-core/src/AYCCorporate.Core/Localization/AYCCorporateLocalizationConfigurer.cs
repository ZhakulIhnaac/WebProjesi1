using Abp.Configuration.Startup;
using Abp.Localization.Dictionaries;
using Abp.Localization.Dictionaries.Xml;
using Abp.Reflection.Extensions;

namespace AYCCorporate.Localization
{
    public static class AYCCorporateLocalizationConfigurer
    {
        public static void Configure(ILocalizationConfiguration localizationConfiguration)
        {
            localizationConfiguration.Sources.Add(
                new DictionaryBasedLocalizationSource(AYCCorporateConsts.LocalizationSourceName,
                    new XmlEmbeddedFileLocalizationDictionaryProvider(
                        typeof(AYCCorporateLocalizationConfigurer).GetAssembly(),
                        "AYCCorporate.Localization.SourceFiles"
                    )
                )
            );
        }
    }
}
