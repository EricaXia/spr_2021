# evaluate a dict of models {name:object}, returns {name:score}
def evaluate_models(X, y, models, folds=5, metric='neg_root_mean_squared_error'):
    results = dict()
    print(f"Using {metric} metric")
    for name, model in models.items():
        # scores = robust_evaluate_model(X, y, model, folds, metric)
        scores = evaluate_model(X, y, model, folds, metric)
        if scores is not None:
            results[name] = scores
            mean_score, std_score = np.mean(scores), np.std(scores)
            print(f'{name} Score: Mean:{mean_score:.3f}, St.Dev:{std_score:.3f}')
        else:
            print(f'{name}: error')
    return results
