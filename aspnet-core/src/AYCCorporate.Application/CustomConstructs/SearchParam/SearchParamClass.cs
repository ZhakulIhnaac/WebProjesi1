using AYCCorporate.CustomConstructs.SearchParamEnums;

namespace AYCCorporate.CustomClasses
{
    public class SearchParamAnd
    {
        public string Column { get; set; } //Defines which of the columns of the related database table will the parameter affect.
        public ESearchParamOperatorTypes OperatorType { get; set; } //Defines the comparison operator such as <, >, == etc.
        public string Value { get; set; } //Defines the value given to use in comparison.
    }

    public class SearchParamOr
    {
        public SearchParamAnd[] SearchParamAndList { get; set; }
    }

    public class SearchParamList
    {
        public SearchParamAnd[] SearchParamAndList { get; set; }
        public SearchParamOr[] SearchParamOrList { get; set; }
    }

    //Definition: SearchParamList class has been developed due to need of a search parameter to be sent from front end.
    //This class can be used in order to filter mostly the getAll-kind-of searches.
    //SearchParamAnd and SearchParamOr classes are defined for grouping OR connector in SQL where clause.
    //LinqBuilder class takes SearchParamList object and developes a query in a sense that can be understood by the Linq Where() method.
}
