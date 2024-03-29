function eachWithIdx(iterable, f) {
    var i = iterable.iterator();
    var idx = 0;
    while (i.hasNext())
        f(i.next(), idx++);
}
function mapEach(iterable, f) {
    var vs = [];
    eachWithIdx(iterable, function (i) {
        vs.push(f(i));
    });
    return vs;
}
function escape(str) {
    str = str.replaceAll("\t|\b|\\f", "");
    str = com.intellij.openapi.util.text.StringUtil.escapeXml(str);
    str = str.replaceAll("\\r|\\n|\\r\\n", "<br/>");
    return str;
}

var NEWLINE = "\n";

function output() {
    for (var i = 0; i < arguments.length; i++) {
        OUT.append(arguments[i]);
    }
}
function outputCol(items) {
    for (var i = 0; i < items.length; i++) {
        output("\t\t", '<column>', escape(items[i][0]), '</column>', NEWLINE);
    }
}
function outputRow(items) {
    output("\t\t", "<row>", NEWLINE);
    for (var i = 0; i < items.length; i++) {
        const value = items[i][0];
        if (value.toLowerCase() === 'null') {
            output("\t\t\t", '<null />', NEWLINE);
        }else{
            output("\t\t\t", '<value>', escape(value), '</value>', NEWLINE);
        }
    }
    output("\t\t", "</row>", NEWLINE);
}

var table_name = (TABLE) ? TABLE?.getName() : 'table_name';

output('<?xml version="1.0" ?>', NEWLINE);
output('<dataset>', NEWLINE);
output("\t", '<table name="', table_name, '">', NEWLINE);

outputCol(mapEach(COLUMNS, function (col) {
    return [col.name()];
}));

eachWithIdx(ROWS, function (row, idx) {
    outputRow(mapEach(COLUMNS, function (col) {
        return [FORMATTER.format(row, col)];
    }));
});

output("\t", "</table>", NEWLINE);
output("</dataset>", NEWLINE);
