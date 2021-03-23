# Modify this code
## Also make it run in loop for ALL of ds_test

# im = np.array(list(ds_test)[0][0])  ## First image of the test set
attack = np.zeros(shape=(28, 28))  ## start with arr of zeroes
## TODO: modify the attack array so it is greater than just zeroes

# for ii in range(12,25):
#    attack[ii,ii]=1
# attack[5:8,5:8]=1  ## Maybe find where the indicies that most number 3s have?

attack_results= {'noise':[],'gt':[],'pred':[],'correct':[],'confidence':[]}

# For every pixel of the test image
for i in [11, 19, 25]:  # len(ds_test)-1):

    # make a new tensor to modify the image
    ## First define how to make the attack array
    ## MODIFY THIS:
    dat = [
        ## Clip/limit values to be between 0 and 1
        np.clip(im[:, :, 0] + attack, 0, 1) for im in np.array(list(ds_test)[i][0])
    ]
    dat = np.array(dat).reshape(32, 28, 28, 1)
    tensored = tf.convert_to_tensor(dat)

    #predictions2+=[np.argmax(pred) for pred in (model.predict([transposed]))]

    # Predict on the modified image
    pred = np.argmax(model.predict([tensored]), axis=1)
    confidence = [np.max(softmax(v)) for v in model.predict([tensored])]

    # Ground Truth label
    gt = gt_labels[i]  # [float(nn) for nn in gt_labels[i-1]]

    # If correct prediction, set = to 1
    correct = (pred == gt).astype(int)

    attack_results['noise'] += [noise]*batch_size
    attack_results['gt'] += list(gt)
    attack_results['pred'] += list(pred)
    attack_results['correct'] += list(correct)
    attack_results['confidence'] += list(confidence)

    # if pred[0]!=int(gt[0]):#i % 50 == 0:

    print(i)
    im = dat[-1].reshape(28, 28)
    plt.imshow(im)
    plt.title('Predicted: '+str(pred[-1])+' Actual: '+str(int(gt[-1])))
    plt.show()

print(np.mean(attack_results['correct']))
