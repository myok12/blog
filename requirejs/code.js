-1-
<!DOCTYPE html>
<html>
    <head>
        <title>Requirejs Demo</title>
        <script src="./require.js" data-main="./main"></script>
    </head>
    <body>
    </body>
</html>
-/1-

-2-
require([
   'path/to/moduleA',
   'path/to/moduleB',
], function ( module, utils ) { // We can name the module anything we please
    // This will run once all modules are loaded
    utils.domReady(function () {
        module.init();
    });
});

-/2-

define([
    'path/to/myclass',
    'path/to/utils'
], function ( MyClass, utils ) {
    function NewClass() {
    }

    NewClass = utils.inherit( MyClass );

    return NewClass;
});


define(function () {
    return function ( a, b ) {
        return a + b;
    };
});

require([ 'addFn' ], function ( add ) {
    var x = add( 3, 2 ); // 5
});



