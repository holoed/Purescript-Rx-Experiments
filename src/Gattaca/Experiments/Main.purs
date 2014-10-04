module Gattaca.Experiments.Main where

import Data.Tuple
import Gattaca.Experiments.Utils
import Gattaca.Experiments.Rx
import Gattaca.Experiments.RxDom
import Debug.Trace
import Control.Monad.Eff

main :: forall eff. Eff (dom :: Dom, trace :: Trace) Unit
main = 
       (mouse_move unit) |> (<$>) (\(Tuple x y) -> x)
                         |> filter (\x -> x < 200)
                         |> (<$>) (show)
                         |> subscribe (\x -> trace x) (\unit -> trace "complete") 