il8nObj
=======

Angular - il8nObj | Localization for JSON Structured Content

This angular module enables JSON hierarchies to be accessed through filters. Its principal intent is for localization, but it can be used anywhere that JSON content is wanted to be inserted into a page through filters. 

To use it in page content, include the file, i18nObj.js. Then, in the page, access the filter like this:

Simple Key-Value:
{{'filePrefix' | i18nObj:'keyValue'}} 


Structured access:
{{'filePrefix' | i18nObj:'client1':'name':'subproperty':'subsubproperty'}}

The il8nObj.html file included here provides an example of both simple and structured content for localization.

