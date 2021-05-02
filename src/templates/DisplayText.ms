<!DOCTYPE html>
<html lang="en">
            <head>
            <title>Your Paste:</title>
            </head>
            <body>
                <form method="GET" action="/InsertText.html"><br>
                    <label for="Text">Your Paste:</label>
{{#Data}}<textarea id="Text" name="Text" rows="10" cols="50">{{text}}</textarea>{{/Data}}
                    
                    <input type="submit" value="Submit"/><br>
                    </form>
            
            </body>
            </html>


