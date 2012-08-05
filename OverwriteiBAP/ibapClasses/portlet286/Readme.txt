Los tencompetence modifican los JAR "zk.jar" y "zbew.jar" (no tengo claro si le cambian algo...)

En las versiones anteriores de ZK, el js del JAR "zk.jar" que había que modificar era "boot.js".

En la versión 5.0.x no existe tal js, pero la función que había que modificar en "boot.js"
se encuentra ahora en "zk.js" del JAR "zk.jar". La función en concreto se llama "ajaxURI", se ha creado
una nueva que tiene en cuenta si la URI que se ha pedido lleva el párametro "p_p_resource_id" y llama
a la función "ajaxURI" original, trás un proceso previo.

Hay que modificar el js "/originalZK/zk.src.js" qeu tiene
un formato más leible, pues el otro, "/originalZK/zk.js" es el comprimido. Por tanto si se quiere modificar
el js hay que cambiar lo que se quiera en "/originalZK/zk.src.js" y ejecutar el bat "/originalZK/compress.bat"
que genera el "/originalZK/zk.js". Para poder ver los cambios en acción hay que cambiar estos 2 js en el jar "zk.jar"
en el repositorio local de maven. En el estado actual dichos js se encuentran en "zk-5.0.2.jar\web\js\zk".