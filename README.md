Universo: A HTML5 canvas compatible graphic engine
======================================================

*Currently only JavaScript framework part is open sourced, the native container part will also be open sourced at a proper time later*

## Introduction:

  **[Universo](http://universo.vincentchen.me)** is a cross-platform "graphic engine" that provides HTML Canvas compatible API in JavaScript.

  To be straight forward, just imagine a window frame that only contains one canvas element of the modern browser. Which supports all JavaScript APIs (Not only drawing, also keyboard/mouse events) inside a canvas element, but can not render any other DOM element.

  Although Universo supports canvas API in JavaScript, it is NOT built upon any existing browser core (such as WebKit, Gecko, etc.). It is completely implemented from the scratch.

  Universo is NOT a "game engine" at this stage, but it can be used as the graphic backend of a game engine or UI engine.

* Background Story: Why using JavaScript and be Canvas API compatible?

  - HTML5 Canvas API is a "good enough" design (well, not the best, but a good start point), by simply following the standard spec, then I don't have to design my own set of APIs from the scratch.
  - There are already a lot of development resources around HTML5 Canvas (libraries and source code) existing on Web, and of course, in JavaScript.
  - Before JavaScript, the first version of Universo executable is built up on C and Lua, in April 2011, I dropped the whole codebase and started over from C++ and JavaScript.
  - I investigated Google DART in Sep 2011, and decided to stay on JavaScript because DART is still far from mature.

## Playable Demos (Pre-Alpha quality):

  * Birds simulation, you can use mouse to disperse those birds.
    - Windows: http://universo.vincentchen.me/universo_msw.zip
(Require Windows Vista or higher, VC++ 2010 runtime, and the latest DirectX)

    - OSX: http://universo.vincentchen.me/universo_mac.zip
(Require OSX 10.5 or higher, Lion is recommended)

## Roadmap:
  * WIP
    - iOS porting
    - WebGL API support
  * TODO
    - Android porting
    - Application OTA loading and running

## Live Videos:

  * Birds simulation: https://vimeo.com/39135223
  * Snow: https://vimeo.com/39135222
  * Liquid simulation: https://vimeo.com/39135225
  * Lines sphere: https://vimeo.com/39135224

## About Creator:

My name is Yuan (Vincent) CHEN and I'm a 360 degrees developer, my experience is not limited to a cetain branch of programming. If you want to know more about my expertise, this is my Linkedin profile.
Email: artyyouth[AT]gmail.com

## Links:

* Vincent's web site: http://vincentchen.me

## Version History:

* 2012/3/24 Pre-Alpha release:
  + Changes:
     - Make playable demos for both Windows and Mac.
  + Known issues:
     - Memory consumption is a little bit hight (120MB).
     - CPU consumption is too high due to bad scheduling algorithm (70%~80% on one CPU core).