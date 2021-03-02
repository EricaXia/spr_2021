dsts = list(ds_test)
testing_data_arr = []
testing_class_arr = []
for i in range(len(dsts)):
    testing_data_arr.append(dsts[i][0])
    testing_class_arr.append(dsts[i][1])

outputs = []
for layer in model.layers:
    keras_function = K.function([model.input], [layer.output])
    outputs.append(keras_function(
        [testing_data_arr[0][img_number_in_batch].numpy().reshape(1, 28, 28, 1)]))



