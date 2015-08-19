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
 * Este archivo mantiene un registro de las actualizaciones al módulo webrtcexperiments.
 *
 * A veces, los cambios entre las versiones implican alteraciones en las estructuras de bases de datos y 
 * otras cosas importantes que pueden romper las instalaciones. La función de actualización en este archivo 
 * intentará ejecutar todas las acciones necesarias para actualizar su instalación anterior a la versión 
 * actual. Si hay algo que no puede hacer la propia, que le dirá lo que tiene que hacer. Los comandos de aquí 
 * todo serán la base de datos neutro, utilizando las funciones definidas en librerías DLL.
 *
 * @package    mod_ectr
 * @copyright  2015 Manuel Fernando
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

/**
 * Ejecuta e-CTR para actualizar desde una version anterior
 *
 * @param int $oldversion
 * @return bool
 */
function xmldb_ectr_upgrade($oldversion) {

    return true;
}