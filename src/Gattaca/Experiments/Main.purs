module Gattaca.Experiments.Main where

import Gattaca.Experiments.Utils
import Gattaca.Experiments.Rx
import Gattaca.Experiments.RxDom
import Debug.Trace

main = (mouse_move unit) |> filter (\x -> x < 100)
                         |> (<$>) (show)
                         |> subscribe (\x -> trace x) (\unit -> trace "complete") 