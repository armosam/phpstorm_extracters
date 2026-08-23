# PHPStorm Data Extractors

PHP Storm extractors from database to different formats

Currently, there are two extractors to extract PHPStorm query results to the PHP array and XML format.

Usage: These extractors could be used in PHPUnit test cases to create XML or PHP datasets directly from database.

For installation just download files to the PHPStorm's ```data/extractors``` folder and use it.

To use for example PHP array extractor:
- select the extractor from list in the PHPStorm's extractors, 
- run your database query, 
- select data you need to extract from results and copy to the clipboard.

When you past the copied data it should be in the PHP array format. 

There are same steps for XML extractor just select XML extractor from the list ...

PHP Array format:

```php
    $<table_name> = [
        '<column_name>' => '<column_value>',
        '<column_name>' => null,
        ...
    ];
```

XML format:

```xml
<?xml version="1.0" ?>
<dataset>
    <table name="<table_name>">
        <column>column_name</column>
        ...
        <row>
            <value name="<column_name>">column_value</value>
            <null name="<column_name>"/>
            ...
        </row>
    </table>
</dataset>
```

Enjoy it for free :)
