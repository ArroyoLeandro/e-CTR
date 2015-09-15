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
            get_login_url(), $CFG->wwwroot.'/course/view.php?id='.$course->id);

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
$PAGE->set_url('/mod/ectr/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($webrtc->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($context);
// Otras opciones que se pueden configurar - o eliminar si es necesario
//$PAGE->set_cacheable(false); // Cache por parte del cliente, por default es true
//$PAGE->set_focuscontrol('some-html-id');

$PAGE->requires->js('/mod/ectr/js/jquery-2.1.4.min.js', true);
$PAGE->requires->js('/mod/ectr/bootstrap/js/bootstrap.min.js');
$PAGE->requires->js('/mod/ectr/RTCMultiConnection.js', true);
$PAGE->requires->js('/mod/ectr/js/jquery.cssemoticons.min.js', true);
//$PAGE->requires->js('/mod/ectr/js/linkify.js');
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

//obtenemos el contexto del curso a partir de su id
$contexto = get_context_instance(CONTEXT_COURSE,$COURSE->id);
$roles = get_user_roles($contexto, $USER->id);
foreach ($roles as $role) {
$url_actual = "http://" . $_SERVER["SERVER_NAME"] . $_SERVER["REQUEST_URI"];
// echo $role->roleid.'<br />'; // muestro el rol
// echo $role->name.'<br />'; // muestro el nombre del rol del usuario
// Realizo la condicion de acuerdo al rol al cual pertenece
// 1 = Admin, 2 = Director del curso, 3 = Tutor.
    if ($role->roleid == 1 || $role->roleid == 2 || $role->roleid == 3) { 
        // Puede elegir que chat de Grupo Abrir
        groups_print_activity_menu($cm, $CFG->wwwroot . "/mod/ectr/view.php?id=$cm->id");
    }
    // Si ya esta en la URL del chat del grupo
    elseif ($url_actual == $CFG->wwwroot."/mod/ectr/view.php?id=$cm->id".'&group='.$currentgroup) {
    }
    // 4 = Tutor sin edicion, 5 = Estudiante, 6 = Invitado, 7= Usuario autenticado
    else {
        /* Carga la URL del chat de su grupo */
        $url = $CFG->wwwroot."/mod/ectr/view.php?id=$cm->id".'&group='.$currentgroup;
        redirect($url);
    }
}


$user = $DB->get_record('user', array('id' => $USER->id));
$avatar = new user_picture($user);
$avatar->courseid = $courseid;
$avatar->link = false;
$avatar->size = 150;
$avatar->class = 'imgchat img-rounded chat-img pull-left';
$avatarjs = $OUTPUT->render($avatar);
$srcAvatarjs = $avatar->get_url($PAGE);
?>

<script type="text/javascript">
var avatarjs = '<?php echo $avatarjs; ?>';
var srcAvatarjs = '<?php echo $srcAvatarjs; ?>';
var userjs = '<?php echo fullname($user, true); ?>';
var currentgroupjs = '<?php echo $currentgroup; ?>';
</script>
<script type="text/javascript" src="https://www.webrtc-experiment.com/RTCMultiConnection/MultiRTC/linkify.js"></script>

<?php
echo '    
        <div class="settings-panel">
            <input type="checkbox" id="autoTranslateText">
            <label for="autoTranslateText" title="Activa esta opcion para chatear con usuarios de diferentes lugares! Todos los mensajes de texto entrantes se convertiran automaticamente a su idioma!!">Traducir chat automaticamente a</label>
            <select id="language" title="Selecciona Idioma en el que todos los mensajes entrantes serán convertidos automaticamente!">
                <option value="en">English</option>
                <option value="ar">Arabic (العربية)</option>
                <option value="zh-CN">Chinese (Simplified Han) [中文简体]</option>
                <option value="zh-TW">Chinese (Traditional Han) [中國傳統]</option>
                <option value="ru">Russian (Русский)</option>
                <option value="de">Dutch</option>
                <option value="fr">French (Français)</option>
                <option value="hi">Hindi (हिंदी)</option>
                <option value="pt">Portuguese (Português)</option>
                <option value="es">Spanish (Español)</option>
                <option value="tr">Turkish (Türk)</option>
                <option value="nl">Nederlands</option>
                <option value="it">Italiano</option>
                <option value="pl">Polish (Polski)</option>
                <option value="ro">Roman (Român)</option>
                <option value="sv">Swedish (Svensk)</option>
                <option value="vi">Vietnam (Việt)</option>
                <option value="th">Thai(ภาษาไทย)</option>
                <option value="ja">Japanese (日本人)</option>
                <option value="ko">Korean (한국의)</option>
                <option value="el">Greek (ελληνικά)</option>
                <option value="ts">Tamil (தமிழ்)</option>
                <option value="hy">Armenian (հայերեն)</option>
                <option value="bs">Bosnian (Bosanski)</option>
                <option value="ca">Catalan (Català)</option>
                <option value="hr">Croatian (Hrvatski)</option>
                <option value="dq">Danish (Dansk)</option>
                <option value="eo">Esperanto</option>
                <option value="fi">Finnish (Suomalainen)</option>
                <option value="ht">Haitian Creole (Haitian kreyòl)</option>
                <option value="hu">Hungarian (Magyar)</option>
                <option value="is">Icelandic</option>
                <option value="id">Indonesian</option>
                <option value="la">Latin (Latinum)</option>
                <option value="lv">Latvija (Latvijas or lætviə)</option>
                <option value="mk">Macedonian (Македонски)</option>
                <option value="no">Norwegian (norsk)</option>
                <option value="sr">Serbian (српски)</option>
                <option value="sk">Slovak (Slovenský)</option>
                <option value="ws">Swahili (Kiswahili)</option>
                <option value="cy">Welsh (Cymraeg)</option>
            </select>
                        
            <button id="save-settings" style="float: right;">Guardar Configuraciones</button>
            <table>
                <tr>
                    <td>
                        <h2>Ajustes de ancho de banda</h2><br />
                        <label for="audio-bandwidth" class="adjust-width">Ancho de banda Audio</label>
                        <input type="text" id="audio-bandwidth" value="50" title="kbits/sec"><small> kbps</small>
                        <br />
                        <label for="video-bandwidth" class="adjust-width">Ancho de banda Video</label>
                        <input type="text" id="video-bandwidth" value="256" title="kbits/sec"><small> kbps</small>
                    </td>
                    
                    <td>
                        <h2>Ajustes resolucion</h2><br />
                        <label for="video-width" class="adjust-width">Ancho del video</label>
                        <input type="text" id="video-width" value="640" title="Puede utilizar valores como: 1920, 1280, 960, 640, 320, 320">
                        <br />
                        <label for="video-height" class="adjust-width">Altura del video</label>
                        <input type="text" id="video-height" value="360" title="Puede utilizar valores como: 1080, 720, 360, 480, 240, 180">
                    </td>
                </tr>
                <tr>
                    <td>
                        <input type="checkbox" id="prefer-sctp" checked>
                        <label for="prefer-sctp" title="Prefiero el uso de canales de datos SCTP. De lo contrario, se utilizarán los canales de datos RTP.">Prefiere canales SCTP de datos?</label><br />
                        
                        <label for="chunk-size" class="adjust-width">Tamaño Chunk</label>
                        <input type="text" id="chunk-size" value="15000" title="El Límite de envío en Chrome es 64.000, sin embargo Firefox tiene un límite de recepción de 16.000."> <small> caracteres</small> <br />
                        <label for="chunk-interval" class="adjust-width">Intervalos Chunk</label>
                        <input type="text" id="chunk-interval" value="100" title="Debe haber un intervalo de 50 ms a 500 ms para asegurar que los datos ISTN sin problemas omitidos."><small> milisegundos</small><br /><br />
                        
                        <input type="checkbox" id="skip-connection-Logs">
                        <label for="skip-connection-Logs" title="Puede desactivar todos los registros de conexión.">Omitir registros de conexion?</label>
                    </td>
                    
                    <td>
                        <h2>Seleccion de dispositivos</h2><br />
                        <label for="audio-devices">Audio</label>
                        <select id="audio-devices"></select>
                        <br />
                        <label for="video-devices">Video</label>
                        <select id="video-devices"></select>
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <label for="max-participants-allowed">Numero maximo de participantes permitidos?</label>
                        <input type="text" id="max-participants-allowed" value="8"> <br /><br />
                        
                        <input type="checkbox" id="fake-pee-connection">
                        <label for="fake-pee-connection" title="Esta característica sólo funciona en Chrome; significa que algunas conexiones entre pares sera creada sin audio/video; y no hay canales de datos!">Configurar Fake Peer Connection?</label>
                    </td>
                    
                    <td>
                        <h2>Seleccionar candidatos</h2><br />
                        <input type="checkbox" id="prefer-stun" checked>
                        <label for="prefer-stun">Permitir candidadtos STUN?</label><br />
                        
                        <input type="checkbox" id="prefer-turn" checked>
                        <label for="prefer-turn">Permitir candidadtos TURN?</label><br />
                        
                        <input type="checkbox" id="prefer-host" checked>
                        <label for="prefer-host">Permitir candidadtos Hose?</label>
                    </td>
                </tr>
                
                <tr>
                    <td>
                        <h2>Establecer opciones DataChannel</h2><br />
                        <label for="dataChannelDict">dataChannelDict</label>
                        <input type="text" id="dataChannelDict" value="{ordered:true}">
                    </td>
                    
                    <td>
                        <h2>Establecer restricciones SDP</h2><br />
                        <input type="checkbox" id="OfferToReceiveAudio" checked>
                        <label for="OfferToReceiveAudio">OfferToReceiveAudio</label><br />
                        
                        <input type="checkbox" id="OfferToReceiveVideo" checked>
                        <label for="OfferToReceiveVideo">OfferToReceiveVideo</label><br />
                        
                        <input type="checkbox" id="IceRestart">
                        <label for="IceRestart">IceRestart</label>
                    </td>
                </tr>
            </table>
            
        </div>
        
        <audio src="data:audio/mp3;base64,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" id="message-sound"></audio>

';
echo '
<div class="row">
  <div class="col-sm-12 col-md-5 sidebar-offcanvas">
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span class="fa fa-users"></span> Usuarios Conectados <span class="badge numbers-of-users" id="badge">0</span> <span title="Opciones" class="fa fa-chevron-down" style="float: right; font-size: 18px; cursor: pointer;"></span>
    </div>
    <ul class="list-group user-list" id="usuariosOnline">
      <li class="list-group-item list-group-item-warning"><small id="listWarning">No hay ningun usuario conectado en este momento! :(</small></li>

    </ul>
</div> 
        </div> <!-- END col-sm-10 col-md-5 sidebar-offcanvas-->
        <div class="col-sm-12 col-md-7">
            <div class="panel panel-primary">
            <!-- local/remote contenedor del video -->
          <div id="videos-container"></div>

            </div>
                
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <span class="fa fa-comment"></span> Conversación
                    <!-- Button trigger modal mySettings-->
                    <span id="settings" title="Configurar las opciones de acuerdo a sus propias necesidades!" class="fa fa-cogs mySettings" style="float: right; font-size: 18px; cursor: pointer;"></span>

                </div> <!-- END panel-heading-->
                <div class="panel-body panel-body-content" id="panel-body">
                    <ul id="chat-output" class="chat" id="file-progress">
                        
                    </ul>
                </div> <!-- END panel-body-->
            <div class="panel-footer">
              <div class="input-group">
                <div class="input-wrapper">
                <input id="chat-input" type="text" value="" placeholder="Escriba su mensaje..." disabled autofocus />
                <label for="share-files">
                  <span role="button" class="fa fa-picture-o add-picture"></span>
                  <span role="button" class="fa fa-paperclip add-file"></span>
                </label>
                <input id="share-files" type="file" style="display: none;" disabled />
                <a role="button" data-toggle="collapse" href="#collapseEmoticon" aria-expanded="false" aria-controls="collapseEmoticon">
                  <span class="fa fa-smile-o add-emoticon"></span>
                </a>
              </div>
            </div>
            <p></p>
            <div class="panel-footer controls" style="text-align: center;">
              <button id="allow-webcam" class="fa fa-video-camera fa-3x" disabled title="Iniciar una videollamada" ></button>
              <button id="allow-mic" class="fa fa-phone fa-3x" disabled title="Iniciar una llamada de voz"></button>
              <button id="allow-screen" class="fa fa-desktop fa-3x" disabled title="Compartir el escritorio"></button>
              <!-- <button id="share-files" class="fa fa-paperclip fa-3x" disabled title="Compartir archivos .PDF, .DOC, Videos, etc."></button> -->
              <button class="fa fa-question-circle fa-2x" disabled title="Ayuda y Comentarios"></button>
            </div>
            <div class="collapse" id="collapseEmoticon" style="padding-top: 10px; margin-bottom: -15px;">
              <div class="well" style="padding: 5px;">
                :-) :-) :) :o) :c) :^) :-D :-( :-9 ;-) :-P :-p :-Þ :-b :-O :-/ :-X :-# B-) 8-) :-\ ;*( :-* :] :> =] =) 8) :} :D 8D XD xD =D :( :< :[ :{ =( ;) ;] ;D :P :p =P =p :b :Þ :O 8O :/ =/ :S :# :X B) O:)
                <3 ;( >:) >;) >:( O_o O_O o_o 0_o T_T ^_^ ?-) [+=..]
              </div>
              <script type="text/javascript">
                $(".well").emoticonize({
                });
              </script>
            </div> <!-- END collapse-->
          </div> <!-- END panel-footer-->
        </div> <!-- END panel panel-primary-->
      </div> <!-- END col-sm-12 col-md-7-->
      <div class="col-sm-12 col-md-12">
            <div class="panel panel-primary">
                <div class="panel-heading">e-Chat UNAD!</div>
                <div class="panel-body">
                    <div class="user-activity">                        
                        <p class="message">
                            e-Chat UNAD es la mejor experiencia de comunicación e interacción en tiempo real por medio de <span style="color:#337ab7;italic;font-weight:bold;">mensajes de texto, video llamadas y llamadas de voz</span> entre los estudiantes UNADISTAS.<br /><br />
                            Hemos diseñado un espacio dedicado a explicarte cómo funciona <span style="color:#337ab7;italic;font-weight:bold;">e-Chat UNAD</span>, puedas identificar todas las funcionalidades y el potencial que tiene para la comunicación en tiempo real en donde podrás compartir mensajes, video, audio, imágenes, archivos, emoticones, realizar conversaciones bilingües y mucho más. <span role="button" class="fa fa-question-circle fa-1x btn btn-primary btn-sm" id="como-funciona" title="Enseñame Cómo funciona!"> Ayuda y comentarios</span>
                        </p>
                    </div>
                </div> <!-- END panel-body-->
            </div> <!-- END panel panel-primary-->
        </div> <!-- END col-sm-12 col-md-12 -->
</div> <!-- END row-->';

// carga URL segun el grupo

/*echo " <script>
    var hash = window.location.hash.replace('#', '');
    if (!hash.length) {
        location.href = location.href + '#' + '&group=' + ".$currentgroup.";

        location.reload();
    }
</script>
";*/

$PAGE->requires->js('/mod/ectr/js/getMediaElement.js');
$PAGE->requires->js('/mod/ectr/module.js');
//$PAGE->requires->js_init_call('M.mod_ectr.init_meeting', array($webrtc->fullname($USER)));

// Termina la pagina.
echo $OUTPUT->footer();
