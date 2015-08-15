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

$id = optional_param('id', 0, PARAM_INT); // Course_module ID, or
$n  = optional_param('n', 0, PARAM_INT);  // ... e-CTR instancia ID

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

// Inicializo $PAGE  página.
$PAGE->set_url('/mod/ectr/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($webrtc->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($context);
// Otras opciones que se pueden configurar - o eliminar si es necesario
//$PAGE->set_cacheable(false); // Cache por parte del cliente, por default es true
//$PAGE->set_focuscontrol('some-html-id');

$PAGE->requires->js('/mod/ectr/js/jquery-2.1.4.min.js',true);
//$PAGE->requires->js('/mod/ectr/bootstrap/js/bootstrap.js',true);
$PAGE->requires->css('/mod/ectr/css/font-awesome.css');
$PAGE->requires->css('/mod/ectr/bootstrap/css/bootstrap.min.css');
$PAGE->requires->css('/mod/ectr/css/styles.css');
//$PAGE->requires->js('/mod/ectr/module.js',true);
//$PAGE->requires->js('/mod/ectr/js/RTCMultiConnection.js');
//$PAGE->requires->js('/mod/ectr/js/socket.io.js');
//$PAGE->requires->js('/mod/ectr/js/DataChannel.js',true);

// Imprimo el encabezado de pagina
echo $OUTPUT->header();

// Compruebo si los grupos se están utilizando aquí.
$groupmode = groups_get_activity_groupmode($cm);
$currentgroup = groups_get_activity_group($cm, true);

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

// Condiciones que deben mostrar la intro, se cambia o se ajusta con parametros propios.
if ($webrtc->intro) {
    echo $OUTPUT->box(format_module_intro('ectr', $webrtc, $cm->id), 'generalbox mod_introbox', 'ebrtcintro');
}

// Mostrar grupos
//groups_print_activity_menu($cm, $CFG->wwwroot . "/mod/ectr/view.php?id=$cm->id");

//$grupo = 'grupo';
//$link = '<a href="'.$CFG->wwwroot."/mod/ectr/view.php?id=$cm->id".'&grupo='.$currentgroup.'">'.$grupo.'</a>';
//echo $link;

// href del grupo del usuario
$groupid = optional_param('groupid', 0, PARAM_INT); // Solo para profesores.

/*echo "<script>
  var hash = window.location.hash.replace('#grupo=', '');
  if (!hash.length) {
      location.href = location.href + '#grupo=' + '".$currentgroup."';
      location.reload();
  }*/

$user = $DB->get_record('user', array('id' => $USER->id));
$avatar = new user_picture($user);
$avatar->courseid = $courseid;
$avatar->link = false;
$avatar->size = 150;
$avatar->class = 'imgchat img-rounded chat-img pull-left';
$avatarjs = $OUTPUT->render($avatar);
?>

<script>
var avatarjs = '<?php echo $avatarjs; ?>' ;
</script>

<?php
echo '
<div class="row">
  <div class="col-sm-12 col-md-5 sidebar-offcanvas">
  <div class="panel panel-primary">
    <div class="panel-heading">
      <span class="fa fa-users"></span> Usuarios Conectados
    </div>
    <ul class="list-group">
        <li class="list-group-item" ng-repeat="peer in peers">
            <div class="btn-group btn-group-xs pull-right">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Acción <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" role="menu">
                <li><a href="javascript:void(0)" ng-click="setMessageTarget(peer.user)">Mensaje directo</a></li>
                <li><a href="javascript:void(0)" ng-click="startVideoCall(peer.user)">Video llamada</a></li>
                <li><a href="javascript:void(0)" ng-click="startVideoCall(peer.user)">Llamada de voz</a></li>
              </ul>
            </div>
           <img src="pix/manuel.jpg" alt="" class="imgchat img-circle" />
              <a href="#" class="user-perfil">Manuel Fernando Marulanda Aguirre</a>
              <span class="user-perfil"><h6><span class="label label-success">online</span></h6></span>
        </li>
        <li class="list-group-item" ng-repeat="peer in peers">
            <div class="btn-group btn-group-xs pull-right">
              <button type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
                Acción <span class="caret"></span>
              </button>
              <ul class="dropdown-menu" role="menu">
                <li><a href="javascript:void(0)" ng-click="setMessageTarget(peer.user)">Mensaje directo</a></li>
                <li><a href="javascript:void(0)" ng-click="startVideoCall(peer.user)">Video llamada</a></li>
                <li><a href="javascript:void(0)" ng-click="startVideoCall(peer.user)">Llamada de voz</a></li>
              </ul>
            </div>
           <img src="pix/foto.jpg" alt="" class="imgchat img-circle">
              <a href="#" class="user-perfil">Shirly Robayo Montenegro</a>
              <span class="user-perfil"><h6><span class="label label-warning">inactivo</span></h6></span>
        </li>
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
                    <span class="fa fa-comment"></span> Conversación <span class="fa fa-cog" style="float: right; font-size: 18px; cursor: pointer;"></span>
                </div> <!-- END panel-heading-->
                <div class="panel-body content" id="scrollmessage">
                    <ul id="chat-output" class="chat" id="file-progress">
                        
                    </ul>
                </div> <!-- END panel-body-->
                <div class="panel-footer">
                  <div class="input-group">
            <div class="input-wrapper">
              <input id="chat-input" type="text" value="" placeholder="Escriba su mensaje..." disabled />
              <span class="fa fa-camera"></span>
              <label for="file">
                <span class="fa fa-paperclip"></span>
              </label>
              <input id="file" type="file" style="display: none;" disabled />
              <span class="fa fa-smile-o"></span>
            </div>
          </div>
              </div> <!-- END panel-footer-->

            </div> <!-- END panel panel-primary-->
        </div> <!-- col-sm-12 col-md-7-->
</div> <!-- END row-->';

echo '<section class="experiment">
          <section hidden>
              <select id="session" title="Session">
                  <option>audio+video+data+screen</option>
                  <option selected>audio+video+data</option>
                  <option>audio+video+screen</option>
                  <option>audio+data+screen</option>
                  <option>audio+video</option>
                  <option>audio+screen</option>
                  <option>video+screen</option>
                  <option>data+screen</option>
                  <option>audio+data</option>
                  <option>video+data</option>
                  <option>audio</option>
                  <option>video</option>
                  <option>data</option>
                  <option>screen</option>
              </select>
              <select id="direction" title="Direction">
                  <option>many-to-many</option>
                  <option>one-to-one</option>
                  <option>one-to-many</option>
                  <option>one-way</option>
              </select>
              <button id="setup-new-session" class="setup">New Session</button>
          </section>
          
          <!-- list of all available broadcasting rooms -->
          <table style="width: 100%;" id="rooms-list"></table>
          
          <!-- local/remote videos container -->
          <div id="videos-container"></div>
      </section>
                  
      <section class="experiment data-box" hidden>
          <table style="width: 100%;">
              <tr>
                  <td>
                    <input type="text" id="chat-input" style="font-size: 1.2em;" placeholder="chat message" disabled>
                  </td>
                  <td style="background: white;">
                  </td>
              </tr>
          </table>
      </section>';

echo '';
$PAGE->requires->js('/mod/ectr/js/getMediaElement.js');
$PAGE->requires->js('/mod/ectr/RTCMultiConnection.js');
$PAGE->requires->js('/mod/ectr/module.js');
$PAGE->requires->js_init_call('M.mod_ectr.init_meeting', array($webrtc->signalingserver, fullname($USER)));

// Termina la pagina.
echo $OUTPUT->footer();
