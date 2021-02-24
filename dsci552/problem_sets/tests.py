import numpy as np 
import math

coeff = -0.120751821
odds_ratio = math.exp(coeff)
prob = odds_ratio / (1 + odds_ratio)

print(f"There is a {coeff * 100:0.2f}% change in the log-odds of Y belonging in class 1 with a 1-unit increase in X.")

print("Odds ratio:", round(odds_ratio,2))
print("Pr(Y=1):", round(prob,2))
