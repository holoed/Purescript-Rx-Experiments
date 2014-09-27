module Gattaca.Experiments.Utils where

(|>) :: forall a b. a -> (a -> b) -> b
(|>) x f = f x
