# Based on https://www.tensorflow.org/datasets/keras_example
# use pip install <package> to find any packages that are missing
import keras  # for fitting DNNs
import tensorflow as tf
import tensorflow_datasets as tfds
import numpy as np
import pandas as pd
from sklearn.metrics import accuracy_score
from gensim.models import Word2Vec
from sklearn.decomposition import PCA
from sklearn.manifold import TSNE
from matplotlib import pyplot as plt

from random import randint
from numpy import array
from numpy import argmax
from numpy import array_equal
from keras.models import Sequential
from keras.layers import LSTM, Dense, TimeDistributed, RepeatVector, Dropout
from keras.utils import plot_model
# import pydotplus, pydot
# from keras.utils.vis_utils import model_to_dot
# keras.utils.vis_utils.pydot = pydot

from kerastuner import HyperModel
from kerastuner.tuners import RandomSearch, Hyperband

seq_in = np.load('seq_in.npy')
seq_out = np.load('seq_out.npy')
embedding_dim = 300
max_sent_eng = 5
n_out = 5


# Adjusted model for Quiz 9


class LSTMHyperModel(HyperModel):
    def __init__(self, input_shape):
        self.input_shape = input_shape

    def build(self, hp):
        model = Sequential()
        model.add(
            LSTM(
                units=hp.Int(
                    "units", min_value=32, max_value=512, step=32, default=128
                ),
                activation=hp.Choice(
                    "dense_activation",
                    values=["relu", "tanh", "sigmoid"],
                    default="relu",
                ),
                input_shape=(max_sent_eng, embedding_dim),
            )
        )
        model.add(
            Dropout(
                rate=hp.Float(
                    "dropout_1", min_value=0.0, max_value=0.5, default=0.25, step=0.05,
                )
            )
        )

        # Repeat the input n_out times
        model.add(RepeatVector(n_out))

        model.add(
            LSTM(
                units=hp.Int(
                    "units", min_value=32, max_value=512, step=32, default=128
                ),
                activation=hp.Choice(
                    "dense_activation",
                    values=["relu", "tanh", "sigmoid"],
                    default="relu",
                ),
                input_shape=(max_sent_eng, embedding_dim),
            )
        )
        model.add(
            Dropout(
                rate=hp.Float(
                    "dropout_2", min_value=0.0, max_value=0.5, default=0.25, step=0.05,
                )
            )
        )

        # Apply a Densely connected layer to every temporal slice of the 3d input
        # model.add(TimeDistributed(Dense(embedding_dim)))

        # stop training when metric improved
        callback = tf.keras.callbacks.EarlyStopping(monitor="loss", patience=3)

        # Build model
        model.compile(optimizer="adam", loss="mse", metrics=["mse"])

        return model



input_shape = seq_in.shape
MAX_TRIALS = 20
EXECUTION_PER_TRIAL = 2

# Tune Model
hypermodel = LSTMHyperModel(input_shape=input_shape)

# print(type(hypermodel))  # <class '__main__.LSTMHyperModel'>

tuner = RandomSearch(
    hypermodel,
    objective='val_accuracy',
    seed=0,
    max_trials=MAX_TRIALS,
    executions_per_trial=EXECUTION_PER_TRIAL,
    directory='random_search',
    project_name='quiz9_lstm'
)

# print(type(tuner))  # <class 'kerastuner.tuners.randomsearch.RandomSearch'>

tuner.search(seq_in, seq_out, epochs=500, validation_split=0.1)