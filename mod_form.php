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
 * Este es el formulario principal de configuracion de webrtcexperiments
 *
 * Utiliza el nucleo estandar de Moodle formslib. Para obtener mas informacion sobre el,
 * visite: http://docs.moodle.org/en/Development:lib/formslib.php
 *
 * @package    mod_ectr
 * @copyright  2015 Manuel Fernando
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

require_once($CFG->dirroot.'/course/moodleform_mod.php');

/**
 * Módulo de configuración de la instancia
 */
class mod_ectr_mod_form extends moodleform_mod {

    /**
     * Define los formularios de los elementos
     */
    public function definition() {

        $mform = $this->_form;

        // Agregar el fieldset "general", en todos los ajustes comunes que se mostraran.
        $mform->addElement('header', 'general', get_string('general', 'form'));

        // Agregar el campo "nombre" estándar.
        $mform->addElement('text', 'name', get_string('ectrname', 'ectr'), array('size' => '64'));
        if (!empty($CFG->formatstringstriptags)) {
            $mform->setType('name', PARAM_TEXT);
        } else {
            $mform->setType('name', PARAM_CLEAN);
        }
        $mform->addRule('name', null, 'required', null, 'client');
        $mform->addRule('name', get_string('maximumchars', '', 255), 'maxlength', 255, 'client');
        $mform->addHelpButton('name', 'ectrname', 'ectr');

        // Anexar el estandar "intro" y campos "introformat"
        $this->add_intro_editor();

        // Añadir el resto de ajustes WebRTC para e_CTR, extendiendo para todos ellos en este fieldset
        // ... O añadir más fieldsets (elementos 'cabecera') si es necesario para una mejor lógica.

        $mform->addElement('text', 'signalingserver', get_string('signalingserver', 'ectr'), array('size' => '64'));
        $mform->setDefault('signalingserver', 'wss://e-ctr-server-websocket-over-nodejs-manueltato11.c9.io:8080');
        $mform->setType('signalingserver', PARAM_TEXT);
        $mform->addHelpButton('signalingserver', 'signalingserver', 'ectr');

        // Añadir elementos estándar, comunes a todos los módulos.
        $this->standard_coursemodule_elements();

        // Añadir botones estándar, comunes a todos los módulos.
        $this->add_action_buttons();
    }
}
