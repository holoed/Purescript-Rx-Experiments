module Gattaca.Experiments.RxDom where

import Data.Tuple 
import Gattaca.Experiments.Rx
import Control.Monad.Eff

foreign import data Dom :: !

foreign import mouse_move
  "function mouse_move(unit) {                                               \
  \  return new PS.Gattaca_Experiments_Rx.Observable(                        \
  \      function (o) {                                                      \  
  \        return function() {                                               \ 
  \                                                                          \
  \           window.onload = function() {                                   \
  \                                                                          \
  \             var mouse_monitor = function(e) {                            \
  \                 var x = e.pageX;                                         \
  \                 var y = e.pageY;                                         \
  \                 var t = { value0 : x, value1 : y };                      \
  \                 o.value0(t)();                                           \
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
  \}" :: forall eff. Unit -> Observable (Eff (dom :: Dom | eff)) (Tuple Number Number) 