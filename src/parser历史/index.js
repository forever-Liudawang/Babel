const {Parser,TokenType} = require('acorn')

Parser.acorn.keywordTypes['andy'] = new TokenType("andy",{keyword:"andy"});
const keyWord = function(Parser){
    return class extends Parser{
        parse(program){
            let newKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this const class extends export import super";
            newKeywords += " andy";
            this.keywords = new RegExp("^(?:" + newKeywords.replace(/ /g, "|") + ")$")
            return (super.parse(program))
        }
        parseStatement() {
            
        }
    }
}
