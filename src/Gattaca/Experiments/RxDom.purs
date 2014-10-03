module Gattaca.Experiments.RxDom where

import Gattaca.Experiments.Rx
import Control.Monad.Eff

foreign import data Dom :: !

foreign import mouse_move
  "function mouse_move(unit) {                                               \
  \  function Observable(value0) {                                           \ 
  \   this.value0 = value0;                                                  \
  \  };                                                                      \
  \  return new Observable(                                                  \
  \      function (o) {                                                      \  
  \        return function() {                                               \ 
  \                                                                          \
  \           window.onload = function() {                                   \
  \                                                                          \
  \             var mouse_monitor = function(e) {                            \
  \                 var x = e.pageX;                                         \
  \                 var y = e.pageY;                                         \
  \                 o.value0(x)();                                           \
  \              };                                                          \
  \                                                                          \
  \               document.addEventListener('mousemove', mouse_monitor);     \
  \            };                                                            \
  \                                                                          \
  \                                                                          \
  \         }                                                                \ 
  \       });                                                                \
  \                                                                          \
  \                                                                          \ 
  \}" :: forall eff. Unit -> Observable (Eff (dom :: Dom | eff)) Number