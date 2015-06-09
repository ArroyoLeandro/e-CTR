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

$id = optional_param('id', 0, PARAM_INT); // Course_module ID, or
$n  = optional_param('n', 0, PARAM_INT);  // ... e-CTR instancia ID

if ($id) {
    $cm         = get_coursemodule_from_id('ectr', $id, 0, false, MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $cm->course), '*', MUST_EXIST);
    $webrtc  = $DB->get_record('ectr', array('id' => $cm->instance), '*', MUST_EXIST);
} else if ($n) {
    $webrtc  = $DB->get_record('ectr', array('id' => $n), '*', MUST_EXIST);
    $course     = $DB->get_record('course', array('id' => $webrtc->course), '*', MUST_EXIST);
    $cm         = get_coursemodule_from_instance('ectr', $webrtc->id, $course->id, false, MUST_EXIST);
} else {
    error('Debe de especificar un ID course_module o un ID de la instancia');
}

require_login($course, true, $cm);
$context = context_module::instance($cm->id);

$event = mod_ectr\event\course_module_viewed::create(array(
    'objectid' => $PAGE->cm->instance,
    'context' => $PAGE->context,
));
$event->add_record_snapshot('course', $PAGE->course);
// En la siguiente línea se puede utilizar $PAGE-> activityrecord si la ha establecido, o se salta esta línea si usted no tiene un registro.
$event->add_record_snapshot($PAGE->cm->modname, $webrtc);
$event->trigger();

// Imprimir el encabezado de la página.
$PAGE->set_url('/mod/ectr/view.php', array('id' => $cm->id));
$PAGE->set_title(format_string($webrtc->name));
$PAGE->set_heading(format_string($course->fullname));
$PAGE->set_context($context);
$PAGE->requires->css('/mod/ectr/styles.css');
$PAGE->requires->css('/mod/ectr/bootstrap/css/bootstrap.min.css');
$PAGE->requires->js('/mod/ectr/bootstrap/js/bootstrap.js');

// Imprimir el encabezado de pagina
echo $OUTPUT->header();

// Condiciones que deben mostrar la intro, se cambia o se ajusta con parametros propios.
if ($webrtc->intro) {
    echo $OUTPUT->box(format_module_intro('ectr', $webrtc, $cm->id), 'generalbox mod_introbox', 'ebrtcintro');
}

echo '';
echo '<div class="row">
        <div class="col-sm-12 col-md-5 sidebar-offcanvas">
            <div class="panel panel-default">
              <!-- Default panel contents -->
        <div class="panel-heading">
          <span class="glyphicon glyphicon-user"></span> Usuarios Online
          <div class="btn-group pull-right">
                        <button type="button" class="btn btn-default btn-xs dropdown-toggle" data-toggle="dropdown">
                            <span class="glyphicon glyphicon-chevron-down"></span>
                        </button>
                        <ul class="dropdown-menu slidedown">
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-facetime-video">
                            </span>Video llamada</a></li>
                            <li><a href="http://www.jquery2dotnet.com"><span class="glyphicon glyphicon-earphone">
                            </span>Llamada de audio</a></li>
                            <li class="divider"></li>
                            <li><a href="javascript:document.location.reload()"><span class="glyphicon glyphicon-refresh"></span>Actualizar estado</a></li>
                            <li><a href="javascript:history.back()"><span class="glyphicon glyphicon-off"></span>Cerrar Sesión</a></li>
                        </ul>
                    </div> <!-- btn-group pull-right-->
        </div> <!-- END panel-heading-->
        <div class="panel-body-user">
          <ul class="listaul user-list">
            <li class="list-group-item media">
              <img src="pix/manuel.jpg" alt="" class="imgchat">
                        <a href="#" class="user-link">Manuel Fernando Marulanda</a>
                        <span class="user-link"><h6>Estudiante <span class="label label-success">online</span></h6></span>
            </li>
            <li class="list-group-item media">
              <img src="pix/foto-perfil.jpg" alt="" class="imgchat">
                        <a href="#" class="user-link">Carlos Andres Marin</a>
                        <span class="user-link"><h6>Tutor <span class="label label-default">offline</span></h6></span>
            </li>
            <li class="list-group-item media">
              <img src="pix/foto.jpg" alt="" class="imgchat">
                        <a href="#" class="user-link">Andrea Carolina</a>
                        <span class="user-link"><h6 >Estudiante <span class="label label-danger">inactive</span></h6></span>
            </li>
          </ul> <!-- END listaul user-list-->
        </div> <!-- END panel-body-->
            </div> <!-- END panel panel-defaul -->
        </div> <!-- END col-sm-10 col-md-5 sidebar-offcanvas-->
        <div class="col-sm-12 col-md-7">
            <div class="panel panel-default">
            <!-- local/remote contenedor del video -->
          <div id="videos-container"></div>
               </div>
                
            <div class="panel panel-default">
                <div class="panel-heading">
                    <span class="glyphicon glyphicon-comment"></span> Chat
                </div> <!-- END panel-heading-->
                <div class="panel-body">
                <div id="chat-output"></div> <!-- chat-->
                <div id="file-progress"></div> <!-- archivos p2p-->
                    <ul class="chat">
                        <li class="left clearfix"><span class="chat-img pull-left">
                            <img src="pix/manuel.jpg" alt="User Avatar" class="imgchat" />
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Manuel Fernando Marulanda</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span>12 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.
                                </p>
                            </div> <!-- END hat-body clearfix-->
                        </li>
                        
                        <li class="left clearfix"><span class="chat-img pull-left">
                            <img src="pix/foto.jpg" alt="User Avatar" class="imgchat" />
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Andrea Carolina</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span>14 mins ago</small>
                                </div> <!-- END header-->
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.
                                </p>
                            </div>
                        </li>
                        <li class="left clearfix"><span class="chat-img pull-left">
                            <img src="pix/foto-perfil.jpg" alt="User Avatar" class="imgchat" />
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Carlos Andres Marin</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span>14 mins ago</small>
                                </div> <!-- END header-->
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur bibendum ornare
                                    dolor, quis ullamcorper ligula sodales.
                                </p>
                            </div>
                        </li>
                        <li class="left clearfix"><span class="chat-img pull-left">
                            <img src="pix/manuel.jpg" alt="User Avatar" class="imgchat" />
                        </span>
                            <div class="chat-body clearfix">
                                <div class="header">
                                    <strong class="primary-font">Manuel Fernando Marulanda</strong> <small class="pull-right text-muted">
                                        <span class="glyphicon glyphicon-time"></span>12 mins ago</small>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                </p>
                            </div> <!-- END hat-body clearfix-->
                        </li>
                    </ul>
                </div> <!-- END panel-body-->
                <div class="panel-footer">
                    <div class="input-group">
                        <input id="btn-input chat-input" type="text" class="form-control input-sm form-control-m" placeholder="Escriba su mensaje aquí..." style="height: 65px"></input>
                        <span class="input-group-btn btn-enviar-chat">
                            <span>
                                <button type="button" class="btn btn-success btn-sm" id="btn-chat" value="Enviar">Enviar</button></br>
                            </span>
                            <span>
                                <img class="img-adjuntar" src="pix/adjuntar.png" alt="Enviar Archivo" title="Enviar Archivo">
                            </span>
                        </span>
                    </div>
                </div> <!-- END panel-footer-->

            </div> <!-- END panel panel-primary-->
        </div> <!-- col-sm-12 col-md-7-->
    </div> <!-- END row-->';
echo '<section class="experiment">
          <h2 class="header" id="feedback">Seleccione "sessionType" y "Dirección de-Flow!"</h2>
          <section>
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
              <button id="setup-new-session" class="setup">Nueva Sesion</button>
          </section>
          
          <!-- Lista de todas las salas disponibles -->
          <table style="width: 100%;" id="rooms-list"></table>
          
          <!-- local/remote contenedor del video -->
          <div id="videos-container"></div>
      </section>
                  
      <section class="experiment data-box">
          <h2 class="header" style="border-bottom: 0;">WebRTC DataChannel</h2>
          <table style="width: 100%;">
              <tr>
                  <td>
                      <h2 style="display: block; font-size: 1em; text-align: center;">Texto del chat</h2>

                      <input type="text" id="chat-input" style="font-size: 1.2em;" placeholder="chat message" disabled>
                  </td>
                  <td style="background: white;">
                      <h2 style="display: block; font-size: 1em; text-align: center;">Compartir archivos</h2>
                      <input type="file" id="file" disabled>
                  </td>
              </tr>
          </table>
      </section>';

$PAGE->requires->js('/mod/ectr/getMediaElement.js');
$PAGE->requires->js('/mod/ectr/RTCMultiConnection.js');
//$PAGE->requires->js('/mod/ectr/module2.js');
$PAGE->requires->js_init_call('M.mod_ectr.init_meeting', array($webrtc->signalingserver, fullname($USER)));

// Termina la pagina.
echo $OUTPUT->footer();
