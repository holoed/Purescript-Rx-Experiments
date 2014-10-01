module Gattaca.Experiments.Main where

import Gattaca.Experiments.Rx
import Gattaca.Experiments.RxDom
import Debug.Trace

main = subscribe (\x -> trace (show x)) (\unit -> trace "complete") (mouse_move unit)