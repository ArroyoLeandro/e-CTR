<?php
// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Imprime la vista de la instancia e-CTR
 *
 * @package    mod_ectr
 * @copyright  2015 Manuel Fernando
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

require_once(dirname(dirname(dirname(__FILE__))).'/config.php');
require_once(dirname(__FILE__).'/lib.php');
require_once($CFG->libdir.'/filelib.php');
// href del grupo del usuario
$id      = required_param('id', PARAM_INT); // Course_module ID, or
$groupid = optional_param('groupid', 0, PARAM_INT); // Solo para profesores.
$n       = optional_param('n', 0, PARAM_INT);  // ... e-CTR instancia ID

if ($id) {
    $cm         = get_coursemodule_from_id('ectr', $id, 0, false, MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $webrtc     = $DB->get_record('ectr', array('id' => $cm->instance), '*', MUST_EXIST);
} else if ($n) {
    $webrtc     = $DB->get_record('ectr', array('id' => $n), '*', MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $webrtc->course), '*', MUST_EXIST);
    $cm         = get_coursemodule_from_instance('ectr', $webrtc->id, $course->id, false, MUST_EXIST);
} else {
    error('Debe de especificar un ID course_module o ID de la instancia');
}

require_login($course, true, $cm);
$context = context_module::instance($cm->id);

// Muestro algo de informacion para los invitados.
if (isguestuser()) {
    $PAGE->set_title($ectr->name);
    echo $OUTPUT->header();
    echo $OUTPUT->confirm('<p>'.get_string('noguests', 'ectr').'</p>'.get_string('liketologin'),
            get_login_url(), $CFG->wwwroot.'/course/help.php?id='.$course->id);

    echo $OUTPUT->footer();
    exit;
}

$event = mod_ectr\event\course_module_viewed::create(array(
    'objectid' => $PAGE->cm->instance,
    'context' => $PAGE->context,
));
$event->add_record_snapshot('course', $PAGE->course);
// En la siguiente línea se puede utilizar $PAGE-> activityrecord si se ha establecido, o se salta esta línea si no se tiene un registro.
$event->add_record_snapshot($PAGE->cm->modname, $webrtc);
$event->trigger();

// Parametros de URL
$params = array();
if ($currentgroup) {
    $groupselect = " AND groupid = '$currentgroup'";
    $groupparam = "_group{$currentgroup}";
    $params['groupid'] = $currentgroup;
} else {
    $groupselect = "";
    $groupparam = "";
}

// Inicializo $PAGE  página.
$PAGE->set_url('/mod/ectr/help.php', array('id' => $cm->id));
$PAGE->set_title(format_string("Centro de ayuda y comentarios | e-Chat UNAD"));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($context);
// Otras opciones que se pueden configurar - o eliminar si es necesario
//$PAGE->set_cacheable(false); // Cache por parte del cliente, por default es true
//$PAGE->set_focuscontrol('some-html-id');

$PAGE->requires->js('/mod/ectr/js/jquery-2.1.4.min.js', true);
$PAGE->requires->js('/mod/ectr/bootstrap/js/bootstrap.min.js');
$PAGE->requires->js('/mod/ectr/js/jquery.cssemoticons.min.js', true);
// ui-stylesheet
$PAGE->requires->css('/mod/ectr/css/jquery.cssemoticons.css');
$PAGE->requires->css('/mod/ectr/css/font-awesome.min.css');
$PAGE->requires->css('/mod/ectr/bootstrap/css/bootstrap.min.css');
$PAGE->requires->css('/mod/ectr/css/styles.css');

// Imprimo el encabezado de pagina
echo $OUTPUT->header();

// Compruebo si los grupos se están utilizando aquí.
$groupmode = groups_get_activity_groupmode($cm);
$currentgroup = groups_get_activity_group($cm, true);

// Condiciones que deben mostrar la intro, se cambia o se ajusta con parametros propios.
if ($webrtc->intro) {
    echo $OUTPUT->box(format_module_intro('ectr', $webrtc, $cm->id), 'generalbox mod_introbox', 'ebrtcintro');
}

// Mostrar grupos
// groups_print_activity_menu($cm, $CFG->wwwroot . "/mod/ectr/view.php?id=$cm->id");

echo '
<div class="row">
  <div class="col-sm-12 col-md-12">
        <div class="panel panel-primary">
            <div class="panel-heading">Bienvenido al Centro de ayuda y comentarios e-Chat UNAD</div>
            <div class="panel-body">
                <div class="panel-group" id="accordion" role="tablist" aria-multiselectable="true">
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help1">
                      <h4 class="panel-title">
                        <a role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse1" aria-expanded="true" aria-controls="collapse1">
                          <i class="fa fa-info-circle"></i> ¿Qué es e-CHAT UNAD?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse1" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="help1">
                      <div class="panel-body">
                        <strong>e-Chat UNAD</strong> es un módulo integrado a Moodle que permite que todos los usuarios  se puedan comunicar en tiempo real. e-Chat UNAD nace como propuesta de opción de grado del estudiante <strong><a href="https://www.facebook.com/ManuelFernandoMarula#e-chat-UNAD" target="_blank"><span class="fa fa-facebook-official" style="color: #3b5998;"></span> Manuel Fernando Marulanda Aguirre </a><a href="https://twitter.com/manueltato11#e-chat-UNAD" target="_blank"><span class="fa fa-twitter" style="color: #55acee;"></span>@manueltato11</a></strong> y busca proporcionar nuevos espacios de interacción entre los usuarios del Campus Virtual para realizar llamadas de voz, videollamadas, enviar mensajes de texto, compartir archivos y hasta realizar conversaciones con traducción en tiempo real a tu lenguaje nativo.<br /><br />
                        e-Chat UNAD es muy fácil de usar y se adapta a tus necesidades, puedes utilizarlo desde tu teléfono móvil Android, equipo de escritorio o hasta desde tu TV sin tener que descargar ninguna aplicación o complementos de terceros, todo esto es posible gracias a que e-Chat UNAD utiliza las nuevas tecnologías que enmarcan la comunicación en tiempo real directamente desde el navegador.<br /><br />
                        Comienza hoy mismo a interactuar con tus compañeros en tiempo real directamente desde el Campus Virtual, no olvides compartirnos tus opiniones, comentarios, sugerencias sobre tu experiencia en la App, todo esto nos ayudara a mejorar las funcionalidades y proporcionar a todos los usuarios <strong>"la mejor experiencia de comunicación e interacción en tiempo real de la web"</strong>.<br/><br/>
                        <strong>¡Revisamos todos los comentarios!</strong>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help2">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse2" aria-expanded="false" aria-controls="collapse2">
                          <i class="fa fa-question-circle"></i> ¿Qué se puede hacer con e-Chat UNAD?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse2" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help2">
                      <div class="panel-body">
                        <ul>
                          <li><strong>Enviar mensajes de texto: </strong>Puedes iniciar una conversación con uno o más compañeros y mantener un chat grupal con sus compañeros de curso.</li>
                          <li><strong>Realizar videollamadas: </strong>Mantén videollamadas cara a cara con todos los integrantes del grupo de cada uno de los cursos, adicionalmente podrás iniciar una videollamada con tu tutor, director y auditor de servicio directamente desde curso sin tener que salir a otros servicios externos.</li>
                          <li><strong>Realizar llamadas de voz: </strong> Podrás realizar llamadas de voz a todos los integrantes del grupo <strong>totalmente gratis</strong> directamente desde cada curso sin importar la ubicación geográfica o distancia que los separe.</li>
                          <li><strong>Compartir fotos: </strong>Puedes compartir fotos sin importar el tamaño o formato, hay un límite de 1GB por archivo, ¿Podrás tener una foto de este tamaño, no lo creo?</li>
                          <li><strong>Compartir archivos PDF, documentos o presentaciones: </strong>Puedes compartir archivos PDF o presentaciones, hay un límite de 1GB por archivo, ¿Podrás tener una presentación de este tamaño, no lo creo?</li>
                          <li><strong>Compartir Videos y Audios: </strong>Puedes compartir videos con tus compañeros o audios en los formaos más comunes, la App identificara su formato y automáticamente iniciara su reproducción en tiempo real entre los participantes. <strong>¡Genial!, No hay límites de transferencia!</strong></li>
                          <li><strong>Compartir pantalla: </strong>Podrás compartir la pantalla con tus compañeros, actualmente esta funcionalidad está disponible para los roles de Director de curso, Tutor y Auditor de servicio. Para el rol de estudiante, <strong>¡Vendrán cosas geniales!</strong></li>
                          <li><strong>Enviar emoticones: </strong>Dale vida a tus conversaciones con nuevos emoticones y emoji, expresa tus sentimientos y estados con una simple carita feliz. <br /><img src="pix/emoticones.png" class="center-block img-rounded" /></li>
                          <li><strong>Traduccion en tiempo real: </strong>Hoy en día la comunicaciones hacen de la vida más llevadera, por eso hemos trabajado en una funcionalidad que nos permite realizar conversaciones en tiempo real en varios idiomas, podrás conversar con un compañero de otro país y ambos entenderán lo que escriben, ya que la aplicación podrá traducir en tiempo real la conversación teniendo en cuenta el idioma nativo que se ha configurado.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help3">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse3" aria-expanded="false" aria-controls="collapse3">
                          <i class="fa fa-question-circle"></i> ¿Qué necesito para comenzar a usar e-Chat UNAD?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse3" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help3">
                      <div class="panel-body">
                        <ul>
                            <li>Ser estudiante UNADISTA.</li>
                            <li>Tener instalado y configurado el micrófono para realizar las llamadas de voz.</li>
                            <li>Tener instalada y configurada la cámara web para realizar las videollamadas.</li>
                            <li>Tener altavoces o diademas para escuchar a sus compañeros en las llamadas de voz y videollamadas.</li>
                            <li>Tener una conexión estable a internet no menor a 1MB (preferiblemente banda ancha).</li>
                            <li>Para una mejor experiencia de usuario, le recomendamos utilizar la versión mas reciente de un navegador moderno como <strong><a href="https://www.google.es/chrome/browser/desktop/index.html" title="Descargar la versión mas reciente de Google Chrome">Google Chrome</a>, <a href="https://www.mozilla.org/es-ES/firefox/new/" title="Descargar la versión mas reciente de Mozilla Firefox">Mozilla Firefox</a> u <a href="http://www.opera.com/es-419" title="Descargar la versión mas reciente de Opera">Opera</a></strong> y permitir que <strong>e-Chat UNAD</strong> acceda al micrófono y a la cámara de la computadora para poder iniciar una videollamada.</li>
                        </ul>
                      </div>
                    </div>
                  </div> <!-- END panel-default help3-->
                  <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help4">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse4" aria-expanded="false" aria-controls="collapse4">
                          <i class="fa fa-question-circle"></i> ¿Cómo inicio sesión en e-Chat UNAD?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse4" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help4">
                      <div class="panel-body">
                        Para utilizar e-Chat UNAD solo basta con iniciar sesión en el Campus Virtual e ir al curso correspondiente, en la parte superior encontrara el icono de acceso al servicio de mensajería instantánea <img src="pix/help/icono-echat-unad.png" class="center-block img-rounded" /><br/><br/>
                        Al ingresar a este, inicializara automáticamente el chat correspondiente a su grupo, en la parte superior izquierda podrá ver los usuarios que están conectados. Al lado derecho el sistema le indicara el grupo al cual está conectado y le recomendara un <strong>enlace permanente</strong> el cual podrá añadirlo a sus <strong>marcadores o favoritos</strong> para volver cuando quiera.<br/><br/>
                        <img src="pix/help/intrerfaz-echat-unad.png" class="center-block img-rounded"/>
                      </div>
                    </div>
                    </div> <!-- END panel-default help4-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help5">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse5" aria-expanded="false" aria-controls="collapse5">
                          <i class="fa fa-question-circle"></i> ¿Cómo inicio una conversación con mis compañeros? 
                        </a>
                      </h4>
                    </div>
                    <div id="collapse5" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help5">
                      <div class="panel-body">
                        Para iniciar una conversación con sus compañeros, basta con escribir en el campo de texto “Escriba su mensaje” y presionar “enter” para enviarlo. <img src="pix/help/escriba-su-mensaje.png" class="center-block img-rounded" /><br/><br/>
                        Es importante conocer que la comunicación en <strong>e-Chat UNAD</strong> se realiza en tiempo real, solo podrá enviar mensajes y realizar videollamadas siempre y cuando haya más de un usuario conectado al chat, al ser un chat grupal, todos recibirán la misma información y no hay ningún tipo de respaldo sobre las conversaciones, una vez cerrada la conversación, se elimina el historial y se cierra el chat de cada grupo.<br/><br/>
                        <img src="pix/help/conversaciones-echat-unad.png" class="center-block img-rounded"/>
                      </div>
                    </div>
                    </div> <!-- END panel-default help5-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help6">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse6" aria-expanded="false" aria-controls="collapse6">
                          <i class="fa fa-question-circle"></i> ¿Cómo se quienes están conectados? 
                        </a>
                      </h4>
                    </div>
                    <div id="collapse6" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help6">
                      <div class="panel-body">
                        Para conocer quiénes de sus compañeros están conectados, debe de ingresar al chat correspondiente a su grupo y al lazo superior izquierdo podrá ver que compañeros están conectados y de esta forma iniciar una conversación o videollamada. <img src="pix/help/usuarios-conectados-echat-unad.png" class="center-block img-rounded" /><br/><br/>
                      </div>
                    </div>
                    </div> <!-- END panel-default help6-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help7">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse7" aria-expanded="false" aria-controls="collapse7">
                          <i class="fa fa-question-circle"></i> ¿Cómo actualizo la foto que aparece en mi perfil de e-Chat UNAD? 
                        </a>
                      </h4>
                    </div>
                    <div id="collapse7" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help7">
                      <div class="panel-body">
                        Toda la información que captura <strong>e-Chat UNAD</strong> como nombre, apellidos, foto de perfil, rol de estudiante, etc. Es capturada directamente de la información del curso. Si quieres cambiar o actualizar la foto, solo basta con actualizar la foto del perfil del respectivo curso, ¡<strong>e-Chat UNAD</strong> sabrá que la cambiaste!.
                      </div>
                    </div>
                    </div> <!-- END panel-default help7-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help8">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse8" aria-expanded="false" aria-controls="collapse8">
                          <i class="fa fa-question-circle"></i> ¿Cómo hago una llamada de voz? 
                        </a>
                      </h4>
                    </div>
                    <div id="collapse8" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help8">
                      <div class="panel-body">
                        Para realizar una llamada de voz, debes de ingresar al <strong>e-Chat UNAD</strong> del respectivo grupo del curso deseado, si hay más de un usuario conectado, podrás iniciar la llamada de voz o videollamada con él.<br><br>
                        Para iniciar una llamada de voz, todo lo que necesitas es hacer clic en el botón de <strong>“Iniciar llamada de voz”.</strong> <img src="pix/help/iniciar-llamada-voz.png" class="center-block img-rounded" /> <br>
                        Inmediatamente a los usuarios les llegara una invitación para aceptar la llamada de voz, la cual podrán <strong>"aceptar"</strong> o <strong>"rechazar"</strong> y <strong>"escuchar solo el audio"</strong> o <strong>"compartir su micrófono".</strong> <img src="pix/help/aceptar-llamada-voz.png" class="center-block img-rounded" />
                      </div>
                    </div>
                    </div> <!-- END panel-default help8-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help9">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse9" aria-expanded="false" aria-controls="collapse9">
                          <i class="fa fa-question-circle"></i> ¿Cómo hago una videollamada? 
                        </a>
                      </h4>
                    </div>
                    <div id="collapse9" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help9">
                      <div class="panel-body">
                        Para realizar una videollamada, debes de ingresar al <strong>e-Chat UNAD</strong> del respectivo grupo del curso deseado, si hay más de un usuario conectado, podrás iniciar la videollamada o llamada de voz con él.<br><br>
                        Para iniciar una videollamada, todo lo que necesitas es hacer clic en el botón de <strong>“Iniciar Videollamada”.</strong> <img src="pix/help/iniciar-videollamada.png" class="center-block img-rounded" /> <br>
                        Inmediatamente a los usuarios les llegara una invitación para aceptar la videollamada, la cual podrán <strong>"aceptar"</strong> o <strong>"rechazar"</strong> y <strong>"ver vista previa"</strong> o <strong>"compartir mi camara".</strong> <img src="pix/help/aceptar-videollamada.png" class="center-block img-rounded" /> <br>
                        Una vez iniciada la videollamada, en la parte superior de la conversación, podrá visualizar el video de los integrantes que aceptaron la videollamada.</strong> <img src="pix/help/ver-videollamada.png" class="center-block img-rounded" />
                      </div>
                    </div>
                    </div> <!-- END panel-default help9-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help10">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse10" aria-expanded="false" aria-controls="collapse10">
                          <i class="fa fa-question-circle"></i> ¿Puedo ingresar a e-Chat UNAD desde un dispositivo movil? 
                        </a>
                      </h4>
                    </div>
                    <div id="collapse10" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help10">
                      <div class="panel-body">
                        Si, actualmente <strong>e-Chat UNAD</strong> es multidispositivos y se adapta al tamaño del dispositivo gracias a su diseño responsivo optimizado para trabajar en tabletas, smartphones, portátiles, desktop y Tv.
                      </div>
                    </div>
                    </div> <!-- END panel-default help10-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help11">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse11" aria-expanded="false" aria-controls="collapse11">
                          <i class="fa fa-question-circle"></i> ¿Por qué no puedo usar e-Chat UNAD desde Safari e Internet Explorer o Chrome en Mac?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse11" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help11">
                      <div class="panel-body">
                        Desafortunadamente, la llamada de voz y videollamada no es posible realizarlas desde los navegadores <strong>Safari e Internet Explorer, Chrome en Mac</strong> ya que actualmente estos navegadores no tienen implementado el soporte para protocolo <strong>WebRTC</strong> y por tal motivo no son compatibles. <br><br>
                        Actualmente <strong>WebRTC</strong> es compatible en las versiones más recientes de los navegadores modernos como <strong><a href="https://www.google.es/chrome/browser/desktop/index.html" title="Descargar la versión más reciente de Google Chrome">Google Chrome</a>, <a href="https://www.mozilla.org/es-ES/firefox/new/" title="Descargar la versión más reciente de Mozilla Firefox">Mozilla Firefox</a> u <a href="http://www.opera.com/es-419" title="Descargar la versión más reciente de Opera">Opera</a></strong> en Windows, Linux y Android. <img src="pix/help/unios-webrtc.png" class="center-block img-rounded" />
                      </div>
                    </div>
                    </div> <!-- END panel-default help11-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help12">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse12" aria-expanded="false" aria-controls="collapse12">
                          <i class="fa fa-question-circle"></i> ¿Cómo envió fotos?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse12" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help12">
                      <div class="panel-body">
                        Para compartir fotos e imágenes, debes de ingresar al <strong>e-Chat UNAD</strong> del respectivo grupo del curso deseado, si hay más de un usuario conectado, podrás compartir archivos, fotos e imágenes con él.
                        <ol>
                            <li>Haz clic en el botón de <strong>"Compartir imagen"</strong> <span class="fa fa-picture-o add-picture"></span> para seleccionar una foto e imagen desde tu computadora, la opción esta ubicada al lado derecho del campo de texto <strong>"Escriba su mensaje"</strong>. <img src="pix/help/escriba-su-mensaje.png" class="center-block img-rounded" /></li>
                            <li>Todos los participantes de la conversación recibirán la misma foto e imagen con vista previa al interior de la conversación, adicionalmente tendrán habilitado una opción para descargar <span class="fa fa-download"></span> la imagen a sus computadores. <img src="pix/help/vista-previa-imagen.png" class="center-block img-rounded" /></li>
                        </ol>
                        <div class="alert alert-warning" role="alert"><span class="fa fa-exclamation-triangle fa-2x"></span> Es muy importante recordar, al ser un chat grupal, todos recibirán la misma información y no hay ningún tipo de respaldo sobre las conversaciones o archivos que allí se comparten, una vez cerrada la conversación, se elimina el historial y se cierra el chat de cada grupo.</div>
                      </div>
                    </div>
                    </div> <!-- END panel-default help12-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help13">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse13" aria-expanded="false" aria-controls="collapse13">
                          <i class="fa fa-question-circle"></i> ¿Cómo envió archivos, documentos o presentaciones?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse13" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help13">
                      <div class="panel-body">
                        Para compartir archivos, documentos o presentaciones, debes de ingresar al <strong>e-Chat UNAD</strong> del respectivo grupo del curso deseado, si hay más de un usuario conectado, podrás compartir archivos, documentos o presentaciones con él.
                        <ol>
                            <li>Haz clic en el botón de <strong>"Compartir archivos y documentos"</strong> <span class="fa fa-paperclip add-file"></span> para seleccionar el archivo o presentacion desde tu computadora, la opción esta ubicada al lado derecho del campo de texto <strong>"Escriba su mensaje"</strong>. <img src="pix/help/escriba-su-mensaje.png" class="center-block img-rounded" /></li>
                            <li>Todos los participantes de la conversación recibirán el mismo archivo, documento o presentacion la cual automaticamente mostrara la vista previa al interior de la conversación, <strong>¡esta posibilidad es genial!</strong>, ya que sin necesidad de descargar el documento o presentación, podemos verla inmediatamente al interior de la conversación y si es necesario descargarla a nuestro computador, se tendrá habilitada la opción para descargar <span class="fa fa-download"></span> dicho archivo o presentación a nuestros computadores. <img src="pix/help/vista-previa-documentos.png" class="center-block img-rounded" /><br/>También podrá compartir videos o audios, estos se reproducirán automáticamente al interior de la conversación, <strong>¡esta posibilidad es estupenda!</strong> ya que no se necesita descargar el video para verlo, de igual manera tendrán habilitado la opción para descargar <span class="fa fa-download"></span> los videos o audios a sus computadores. <img src="pix/help/vista-previa-videos.png" class="center-block img-rounded" /></li>
                        </ol>
                        <div class="alert alert-warning" role="alert"><span class="fa fa-exclamation-triangle fa-2x"></span> Es muy importante recordar, al ser un chat grupal, todos recibirán la misma información y no hay ningún tipo de respaldo sobre las conversaciones o archivos que allí se comparten, una vez cerrada la conversación, se elimina el historial y se cierra el chat de cada grupo.</div>
                      </div>
                    </div>
                    </div> <!-- END panel-default help13-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help14">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse14" aria-expanded="false" aria-controls="collapse14">
                          <i class="fa fa-question-circle"></i> ¿Cómo gestiono mis Chats de grupo?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse14" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help14">
                      <div class="panel-body">
                        Con <strong>e-Chat UNAD</strong>, puedes iniciar sesión en todos los chat grupales de los cursos que estás viendo, lo único que debes de tener en cuenta es dejar una pestaña abierta con cada uno de los chats para que cuando algún compañero se conecte, <strong>e-Chat UNAD</strong> te notificara por medio de una alerta visual y sonora.<br/><br/>
                        De igual manera, <strong>e-Chat UNAD</strong> le recomendara un <strong>enlace permanente</strong> el cual podrá añadirlo a sus <strong>marcadores o favoritos</strong> para volver cuando quiera, este enlace es único por cada grupo y solo es permitido el ingreso de los usuarios correspondientes a dicho grupo. <img src="pix/help/intrerfaz-conversacion-echat-unad.png" class="center-block img-rounded" /><br/>
                        Puedes invitar a tus compañeros a iniciar una conversación en tiempo real o videollamada solo con publicar la URL en los foros o mensajería interna, al ingresar al link, les cargara el chat de su grupo.
                      </div>
                    </div>
                    </div> <!-- END panel-default help14-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help15">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse15" aria-expanded="false" aria-controls="collapse15">
                          <i class="fa fa-question-circle"></i> ¿Puedo compartir mi pantalla?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse15" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help15">
                      <div class="panel-body">
                        Podrás compartir la pantalla con tus compañeros directamente desde el navegador, actualmente esta funcionalidad solo está disponible para los roles de Director de curso, Tutor y Auditor de servicio. Para el rol de estudiante, <strong>¡Vendrán cosas geniales!</strong>, por eso, déjanos tu comentario al respecto y si te gustaría que esta funcionalidad ente activa para el rol de estudiante.<br/><br/>
                        <strong>¡Revisamos todos los comentarios!</strong><br/>
                        <a href="https://docs.google.com/forms/d/16kSrwCEc9om9yvqgfgoZMYXwhLDk7KnqeTFoPASi1f0/viewform" target="_blank" title="Envíanos tus comentarios"><button type="button" class="btn btn-success">Déjanos tu opinión</button></a>
                      </div>
                    </div>
                    </div> <!-- END panel-default help15-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help16">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse16" aria-expanded="false" aria-controls="collapse16">
                          <i class="fa fa-question-circle"></i> ¿Qué sucede si estoy en una videollamada o llamada de voz y se cae mi conexión a internet?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse16" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help16">
                      <div class="panel-body">
                        Hemos hecho nuestro mayor esfuerzo para optimizar de <strong>e-Chat UNAD</strong> la posibilidad de reconectar una videollamada o llamada de voz en curso, es muy importante que tengas en cuenta <strong>los requisitos para que e-Chat UNAD funcione óptimamente</strong>, de igual manera nos puedes dejar tu comentario si presentas continuos problemas de conexión al realizar videollamadas, todo esto nos ayuda a optimizar mejor nuestro sistema de señalización o servidor.<br/><br/>
                        <strong>¡Revisamos todos los comentarios!</strong><br/>
                        <a href="https://docs.google.com/forms/d/16kSrwCEc9om9yvqgfgoZMYXwhLDk7KnqeTFoPASi1f0/viewform" target="_blank" title="Envíanos tus comentarios"><button type="button" class="btn btn-success">Déjanos tu opinión</button></a>
                      </div>
                    </div>
                    </div> <!-- END panel-default help16-->
                    <div class="panel panel-default">
                    <div class="panel-heading" role="tab" id="help17">
                      <h4 class="panel-title">
                        <a class="collapsed" role="button" data-toggle="collapse" data-parent="#accordion" href="#collapse17" aria-expanded="false" aria-controls="collapse17">
                          <i class="fa fa-question-circle"></i> ¿Dónde puedo dejar mis opiniones, comentarios, sugerencias e ideas de mejora?
                        </a>
                      </h4>
                    </div>
                    <div id="collapse17" class="panel-collapse collapse" role="tabpanel" aria-labelledby="help17">
                      <div class="panel-body">
                        Continuamente estaremos realizando mejoras y adaptaciones para lograr de <strong>e-Chat UNAD “la mejor experiencia de comunicación e interacción en tiempo real de la web”</strong>, este ha sido un trabajo arduo basado en experiencias de mejora que potencializaran la interacción de los <strong>estudiantes UNADISTAS</strong> al interior del Campus Virtual, <strong>¡un sistema en continuo desarrollo!</strong>.<br/><br/>
                        <strong>¡Revisamos todos los comentarios!</strong><br/>
                        <a href="https://docs.google.com/forms/d/16kSrwCEc9om9yvqgfgoZMYXwhLDk7KnqeTFoPASi1f0/viewform" target="_blank" title="Envíanos tus comentarios"><button type="button" class="btn btn-success">Déjanos tu opinión</button></a><br/><br/>
                        De igual forma, si lo que quieres comunicarse directamente con su autor, <strong>Manuel Fernando Marulanda Aguirre</strong>, puedes ubicarlo en las redes sociales como <strong><a href="https://www.facebook.com/ManuelFernandoMarula#e-chat-UNAD" target="_blank"><span class="fa fa-facebook-official" style="color: #3b5998;"></span> Facebook </a><a href="https://twitter.com/manueltato11#e-chat-UNAD" target="_blank"><span class="fa fa-twitter" style="color: #55acee;"></span>Twitter</a></strong> o al email <a href="mailto:mfmarulandaa@unadvirtual.edu.co?subject=Feedback e-Chat UNAD">mfmarulandaa@unadvirtual.edu.co</a>
                      </div>
                    </div>
                    </div> <!-- END panel-default help17-->
                </div> <!-- END panel-default accordion-->
            </div> <!-- END panel-body-->
        </div> <!-- END panel panel-primary-->
    </div> <!-- END col-sm-12 col-md-12 -->
</div> <!-- END row-->
';

// Termina la pagina.
echo $OUTPUT->footer();
