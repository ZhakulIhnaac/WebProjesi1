using AYCCorporate.CustomConstructs.SearchParamEnums;
using System;

namespace AYCCorporate.CustomClasses
{
    public class LinqBuilder
    {
        public static string WhereStatementBuilder(SearchParamList searchParamList)
        {
            string whereExpression = "x=> x.IsDeleted == false";
            bool firstIterationOfOr = true;

            foreach (var searchParamAnd in searchParamList.SearchParamAndList)
            {
                whereExpression = LinqAdder(searchParamAnd,whereExpression, "&&");
            }

            foreach (var searchParamOr in searchParamList.SearchParamOrList)
            {
                whereExpression += " && (";
                foreach (var searchParamAnd in searchParamOr.SearchParamAndList)
                {
                    if (firstIterationOfOr)
                    {
                        whereExpression = LinqAdder(searchParamAnd, whereExpression);
                        firstIterationOfOr = false;
                    }
                    else
                    {
                        whereExpression = LinqAdder(searchParamAnd, whereExpression, "||");
                    }
                }
                whereExpression += ")";
                firstIterationOfOr = true;
            }

            return whereExpression;
        }

        public static string LinqAdder(SearchParamAnd searchParamAnd, string whereExpressionToExtend, string connector = null)
        {
            string searchParamOperator;

                searchParamOperator = searchParamAnd.OperatorType switch
                {
                    ESearchParamOperatorTypes.Equal => " == " + '"' + searchParamAnd.Value + '"',
                    ESearchParamOperatorTypes.NotEqual => " != " + '"' + searchParamAnd.Value + '"',
                    ESearchParamOperatorTypes.Include => ".toLower().Contains(" + '"' + searchParamAnd.Value + '"' + ".toLower())",
                    ESearchParamOperatorTypes.GreaterThan => " > " + '"' + searchParamAnd.Value + '"',
                    ESearchParamOperatorTypes.SmallerThan => " < " + '"' + searchParamAnd.Value + '"',
                    ESearchParamOperatorTypes.GreaterThanOrEqual => " >= " + '"' + searchParamAnd.Value + '"',
                    ESearchParamOperatorTypes.SmallerThanOrEqual => " <= " + '"' + searchParamAnd.Value + '"',
                    _ => throw new System.Exception("Error in searchParamOperatorType"),
                };

                return whereExpressionToExtend += " " + connector + " x." + searchParamAnd.Column + searchParamOperator;
        }
    }

}
