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
  str = com.intellij.openapi.util.text.StringUtil.escapeXml(str);
  return str;
}
function quote(str) {
  return "'" + str + "'";
}

var NEWLINE = "\n";
var table_name = (TABLE) ? `$${TABLE?.getName()}` : '$exported_data';

function output() {
  for (var i = 0; i < arguments.length; i++) {
    OUT.append(arguments[i]);
  }
}
function outputRow(items) {
  output("\t[", NEWLINE);

  for (var i = 0; i < items.length; i++) {
    if ( i > 0 ) { output(',', NEWLINE); }
    const col = items[i][0];
    const val = items[i][1];
    if (val === 'null' || (!isNaN(val) && !isNaN(parseFloat(val)))) {
      output('\t\t', quote(col), ' => ', val);
    } else {
      output('\t\t', quote(col), ' => ', quote(val));
    }
  }

  output(NEWLINE, "\t]");
}

output(`${table_name} = [`, NEWLINE);

eachWithIdx(ROWS, function (row, idx) {
  if ( idx > 0 ) {
    output(',', NEWLINE);
  }
  outputRow(mapEach(COLUMNS, function (col) {
    return [col.name(), FORMATTER.format(row, col)];
  }));
});

output(NEWLINE, "];", NEWLINE);