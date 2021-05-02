<!DOCTYPE html>
<html lang="en">
            <head>
            <title>Your Paste Upload Id:</title>
            </head>
            <body>
                <form method="GET" action="/InsertText.html"><br>
                    <label for="Text">Your Paste & Id:</label>
{{#Data}}
                    <textarea id="Text" name="Text" rows=10" cols="50">{{Text}}</textarea>
                    <textarea id="Text" name="Text" rows="2" cols="15">{{id}}</textarea>{{/Data}}
                    
                    
                    </form>
            
            </body>
            </html>


