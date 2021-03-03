# dsts = list(ds_test)
# testing_data_arr = []
# testing_class_arr = []
# for i in range(len(dsts)):
#     testing_data_arr.append(dsts[i][0])
#     testing_class_arr.append(dsts[i][1])

# outputs = []
# for layer in model.layers:
#     keras_function = K.function([model.input], [layer.output])
#     outputs.append(keras_function(
#         [testing_data_arr[0][img_number_in_batch].numpy().reshape(1, 28, 28, 1)]))


from keras import backend as K

# dense = True
dense = False

if dense:
    model = tf.keras.models.Sequential([

#    - first flattens data into a vector (image is 28 x 28)
      tf.keras.layers.Flatten(input_shape=(28, 28)),

#    - then creates a dense 128-node layer
      # kernel_regularizer=regularizers.l1_l2(l1=1e-5, l2=1e-4)
      tf.keras.layers.Dense(56, activation='relu'),

#    - then creates a dropout "layer" (it says how many nodes are dropped out in previous layer)
    tf.keras.layers.Dropout(.2, input_shape=(56,)),

#    - then another 128-node layer
      tf.keras.layers.Dense(24, activation='relu'),

#    - and finally 10-node layer as the head.
      tf.keras.layers.Dense(10)
    ])

else:
    model = tf.keras.models.Sequential([])

    # model.add(tf.keras.layers.Conv2D(64, kernel_size=3, activation='relu', input_shape=(28,28,1)))
    model.add(tf.keras.layers.Conv2D(64, kernel_size=3, activation='relu', input_shape=(
        28, 28, 1), kernel_regularizer=regularizers.l2(0.01), bias_regularizer=regularizers.l2(0.01)))

    # model.add(tf.keras.layers.BatchNormalization())

    model.add(tf.keras.layers.Conv2D(32, kernel_size=3, activation='relu', kernel_regularizer=regularizers.l2(0.01), bias_regularizer = regularizers.l2(0.01)))

    # model.add(tf.keras.layers.BatchNormalization())

    # model.add(tf.keras.layers.Dropout(.5))
    model.add(tf.keras.layers.Dropout(.2))

    # model.add(tf.keras.layers.MaxPooling2D(pool_size=(2, 2),strides=(1, 1), padding='valid'))

    model.add(tf.keras.layers.Flatten())

    # model.add(tf.keras.layers.BatchNormalization())

    # tf.keras.layers.Dense(24,activation='relu'),

    model.add(tf.keras.layers.Dense(10))

# this specifies how we find the best NN
# - Optimizer like Adam is found to work well
# - Loss is "sparse categorical cross entropy" (you can choose whatever loss function on keras improves your model)
# - We also record accuracy ("metric"), this does not affect training
model.compile(
    optimizer = tf.keras.optimizers.Adam(0.001),
    loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True),
    metrics = [tf.keras.metrics.SparseCategoricalAccuracy()],
)

# this is stuff we record
# "early stopping" tells us when we found the optimum without training more epochs
my_callbacks=[
    tf.keras.callbacks.EarlyStopping(patience=1),
    tf.keras.callbacks.ModelCheckpoint(
        filepath='model.{epoch:02d}-{val_loss:.2f}.h5'),
    tf.keras.callbacks.TensorBoard(log_dir='./logs'),
]
