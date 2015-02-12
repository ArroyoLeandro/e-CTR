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
 * Se define la version de e-CTR
 *
 * Este fragmento de código es llamado moodle_needs_upgrading () y
 * /admin/index.php
 *
 * @package    mod_ectr
 * @copyright  2015 Manuel Fernando & Daniel Felipe
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();

$plugin->version   = 2015021100;	// La version actual del Plugin (Fecha: YYYYMMDDXX).
$plugin->requires  = 2015010200;	// Requires this Moodle version.
$plugin->cron      = 0;				// Periodo del cron para comprobar este plugin (secs).
$plugin->component = 'mod_ectr'; 	// Full name of the plugin (used for diagnostics).
$plugin->maturity  = MATURITY_RC;
$plugin->release   = '0.1';
